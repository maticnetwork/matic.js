import { BaseContract, BaseWeb3Client } from "../model";
import { RootChainManager } from "./root_chain_manager";
import { Logger, formatAmount, ProofUtil } from "../utils";
import { LOGGER } from "../constant";
import assert from "assert";
import BN from "bn.js";
import ethUtils from "ethereumjs-util";
import { ITransactionOption, ITransactionReceipt } from "src/interfaces";
import { NetworkService } from "../services";

export class ExitManager {
    private maticClient_: BaseWeb3Client;

    rootChainManager: RootChainManager;

    requestConcurrency: number;

    constructor(maticClient: BaseWeb3Client, rootChainManager: RootChainManager, requestConcurrency: number) {
        this.maticClient_ = maticClient;
        this.rootChainManager = rootChainManager;
        this.requestConcurrency = requestConcurrency;
    }

    async exit(burnTxHash: string, logSignature: string, option: ITransactionOption) {
        const payload = await this.buildPayloadForExit(
            burnTxHash,
            logSignature,
            this.requestConcurrency
        );
        const method = this.rootChainManager.method("exit", payload);

        return this.rootChainManager['processWrite'](
            method,
            option
        );
    }

    async exitFast(burnTxHash: string, logSignature: string, option: ITransactionOption) {
        const payload = await this.buildPayloadForFastExit(
            burnTxHash,
            logSignature,
        );
        const method = this.rootChainManager.method("exit", payload);

        return this.rootChainManager['processWrite'](
            method,
            option
        );
    }

    private buildPayloadForExitFastMerkle_(start, end, blockNumber) {
        // build block proof
        return ProofUtil.buildBlockProof(
            this.maticClient_,
            parseInt(start, 10),
            parseInt(end, 10),
            parseInt(blockNumber + '', 10)
        );
    }

    async buildPayloadForFastExit(burnTxHash, logEventSig) {
        // check checkpoint
        const lastChildBlock = await this.rootChainManager.getLastChildBlock();
        const receipt = await this.maticClient_.getTransactionReceipt(burnTxHash);
        const block: any = await this.maticClient_.getBlock(receipt.blockNumber);

        assert.ok(
            new BN(lastChildBlock).gte(new BN(receipt.blockNumber)),
            'Burn transaction has not been checkpointed as yet'
        );

        let headerBlock;
        const service = new NetworkService(
            this.rootChainManager['client'].metaNetwork.Matic.NetworkAPI
        );
        try {
            headerBlock = await service.getBlockIncluded(receipt.blockNumber as any);
            if (!headerBlock || !headerBlock.start || !headerBlock.end || !headerBlock.headerBlockNumber) {
                throw Error('Network API Error');
            }
        } catch (err) {
            const rootBlockNumber = await this.rootChainManager.findRootBlockFromChild(receipt.blockNumber);
            headerBlock = await this.rootChainManager.method(
                "headerBlocks", formatAmount(rootBlockNumber)
            ).read<{ start: string, end: string }>();
        }

        // build block proof

        const start = parseInt(headerBlock.start, 10);
        const end = parseInt(headerBlock.end, 10);
        const receiptBlockNumber = parseInt(receipt.blockNumber + '', 10);
        let blockProof;

        try {
            blockProof = await service.getProof(
                start, end, receiptBlockNumber
            );
            if (!blockProof) {
                throw Error('Network API Error');
            }
        } catch (err) {
            blockProof = await this.buildPayloadForExitFastMerkle_(start, end, receiptBlockNumber);
        }

        const receiptProof: any = await ProofUtil.getReceiptProof(
            receipt, block, this.maticClient_
        );
        const logIndex = this.getLogIndex_(
            logEventSig, receipt
        );

        return this._encodePayload(
            headerBlock.headerBlockNumber,
            blockProof,
            receipt.blockNumber,
            block.timestamp,
            Buffer.from(block.transactionsRoot.slice(2), 'hex'),
            Buffer.from(block.receiptsRoot.slice(2), 'hex'),
            ProofUtil.getReceiptBytes(receipt), // rlp encoded
            receiptProof.parentNodes,
            receiptProof.path,
            logIndex
        );
    }

    private getLogIndex_(logEventSig: string, receipt: ITransactionReceipt) {
        let logIndex = -1;

        switch (logEventSig) {
            case '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef':
            case '0xf94915c6d1fd521cee85359239227480c7e8776d7caf1fc3bacad5c269b66a14':
                logIndex = receipt.logs.findIndex(
                    log =>
                        log.topics[0].toLowerCase() === logEventSig.toLowerCase() &&
                        log.topics[2].toLowerCase() === '0x0000000000000000000000000000000000000000000000000000000000000000'
                );
                break;

            case '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62':
            case '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb':
                logIndex = receipt.logs.findIndex(
                    log =>
                        log.topics[0].toLowerCase() === logEventSig.toLowerCase() &&
                        log.topics[3].toLowerCase() === '0x0000000000000000000000000000000000000000000000000000000000000000'
                );
                break;

            default:
                logIndex = receipt.logs.findIndex(log => log.topics[0].toLowerCase() === logEventSig.toLowerCase());
        }

        assert.ok(logIndex > -1, 'Log not found in receipt');
        return logIndex;
    }

    async buildPayloadForExit(burnTxHash: string, logEventSig: string, requestConcurrency?) {
        // check checkpoint
        const [lastChildBlock, burnTx, receipt] = await Promise.all([
            this.rootChainManager.getLastChildBlock(),
            this.maticClient_.getTransaction(burnTxHash),
            this.maticClient_.getTransactionReceipt(burnTxHash)
        ]);

        const block = await this.maticClient_.getBlockWithTransaction(burnTx.blockNumber);

        assert.ok(
            new BN(lastChildBlock).gte(new BN(burnTx.blockNumber)),
            'Burn transaction has not been checkpointed as yet'
        );
        const rootBlockNumber = await this.rootChainManager.findRootBlockFromChild(burnTx.blockNumber);

        const rootBlockInfo = await this.rootChainManager.method(
            "headerBlocks", formatAmount(rootBlockNumber)
        ).read<{ start: string, end: string }>();

        // build block proof
        const blockProof = await ProofUtil.buildBlockProof(
            this.maticClient_,
            parseInt(rootBlockInfo.start, 10),
            parseInt(rootBlockInfo.end, 10),
            parseInt(burnTx.blockNumber + '', 10)
        );

        const receiptProof: any = await ProofUtil.getReceiptProof(
            receipt,
            block,
            this.maticClient_,
            requestConcurrency
        );

        const logIndex = this.getLogIndex_(
            logEventSig, receipt
        );

        return this._encodePayload(
            rootBlockNumber,
            blockProof,
            burnTx.blockNumber,
            block.timestamp,
            Buffer.from(block.transactionsRoot.slice(2), 'hex'),
            Buffer.from(block.receiptsRoot.slice(2), 'hex'),
            ProofUtil.getReceiptBytes(receipt), // rlp encoded
            receiptProof.parentNodes,
            receiptProof.path,
            logIndex
        );
    }

    private _encodePayload(
        headerNumber,
        buildBlockProof,
        blockNumber,
        timestamp,
        transactionsRoot,
        receiptsRoot,
        receipt,
        receiptParentNodes,
        path,
        logIndex
    ) {
        return ethUtils.bufferToHex(
            ethUtils.rlp.encode([
                headerNumber,
                buildBlockProof,
                blockNumber,
                timestamp,
                ethUtils.bufferToHex(transactionsRoot),
                ethUtils.bufferToHex(receiptsRoot),
                ethUtils.bufferToHex(receipt),
                ethUtils.bufferToHex(ethUtils.rlp.encode(receiptParentNodes)),
                ethUtils.bufferToHex(Buffer.concat([Buffer.from('00', 'hex'), path])),
                logIndex,
            ])
        );
    }

    async getExitHash(burnTxHash, logEventSig, requestConcurrency?) {
        const lastChildBlock = await this.rootChainManager.getLastChildBlock();
        const receipt = await this.maticClient_.getTransactionReceipt(burnTxHash);
        const block = await this.maticClient_.getBlockWithTransaction(receipt.blockNumber);

        assert.ok(
            new BN(lastChildBlock).gte(new BN(receipt.blockNumber)),
            'Burn transaction has not been checkpointed as yet'
        );

        const receiptProof: any = await ProofUtil.getReceiptProof(
            receipt,
            block,
            this.maticClient_,
            requestConcurrency
        );

        const logIndex = this.getLogIndex_(logEventSig, receipt);
        const nibbleArr = [];
        receiptProof.path.forEach(byte => {
            nibbleArr.push(Buffer.from('0' + (byte / 0x10).toString(16), 'hex'));
            nibbleArr.push(Buffer.from('0' + (byte % 0x10).toString(16), 'hex'));
        });

        return this.maticClient_.etheriumSha3(
            receipt.blockNumber, ethUtils.bufferToHex(Buffer.concat(nibbleArr)), logIndex
        );
    }

    isExitProcessed(burnTxHash: string, logSignature: string) {
        const exitHash = this.getExitHash(
            burnTxHash, logSignature, this.requestConcurrency
        );
        return this.rootChainManager.method(
            "processedExits", exitHash
        ).read<boolean>();
    }
}