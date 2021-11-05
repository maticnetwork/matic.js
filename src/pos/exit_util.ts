import { RootChain } from "./root_chain";
import { Converter, ProofUtil, Web3SideChainClient } from "../utils";
import BN from "bn.js";
import ethUtils from "ethereumjs-util";
import { IBlockWithTransaction, ITransactionReceipt } from "../interfaces";
import { service } from "../services";
import { BaseWeb3Client } from "../abstracts";
import { ErrorHelper } from "../utils/error_helper";
import { ERROR_TYPE, IBaseClientConfig } from "..";

interface IChainBlockInfo {
    lastChildBlock: string;
    txBlockNumber: number;
}

interface IRootBlockInfo {
    start: string;
    end: string;
    blockNumber: BN;
}

export class ExitUtil {
    private maticClient_: BaseWeb3Client;

    rootChain: RootChain;

    requestConcurrency: number;
    config: IBaseClientConfig;

    constructor(client: Web3SideChainClient<IBaseClientConfig>, rootChain: RootChain) {
        this.maticClient_ = client.child;
        this.rootChain = rootChain;
        const config = client.config;
        this.config = config;
        this.requestConcurrency = config.requestConcurrency;
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
        if (logIndex < 0) {
            throw new Error("Log not found in receipt");
        }
        return logIndex;
    }

    getChainBlockInfo(burnTxHash: string) {
        return Promise.all([
            this.rootChain.getLastChildBlock(),
            this.maticClient_.getTransaction(burnTxHash),
        ]).then(result => {
            return {
                lastChildBlock: result[0],
                txBlockNumber: result[1].blockNumber
            } as IChainBlockInfo;
        });
    }

    private isCheckPointed_(data: IChainBlockInfo) {
        // lastchild block is greater equal to transacton block number; 
        return new BN(data.lastChildBlock).gte(new BN(data.txBlockNumber));
    }

    isCheckPointed(burnTxHash: string) {
        return this.getChainBlockInfo(
            burnTxHash
        ).then(result => {
            return this.isCheckPointed_(
                result
            );
        });
    }

    private getRootBlockInfo(txBlockNumber: number) {
        // find in which block child was included in parent
        let rootBlockNumber: BN;
        return this.rootChain.findRootBlockFromChild(
            txBlockNumber
        ).then(blockNumber => {
            rootBlockNumber = blockNumber;
            return this.rootChain.method(
                "headerBlocks",
                Converter.toHex(blockNumber)
            );
        }).then(method => {
            return method.read<IRootBlockInfo>();
        }).then(rootBlockInfo => {
            rootBlockInfo.blockNumber = rootBlockNumber;
            return rootBlockInfo;
        });

    }

    private getRootBlockInfoFromAPI(txBlockNumber: number) {
        this.maticClient_.logger.log("block info from API 1");
        return service.network.getBlockIncluded(
            this.config.network,
            txBlockNumber
        ).then(headerBlock => {
            this.maticClient_.logger.log("block info from API 2", headerBlock);
            if (!headerBlock || !headerBlock.start || !headerBlock.end || !headerBlock.headerBlockNumber) {
                throw Error('Network API Error');
            }
            return headerBlock;
        }).catch(err => {
            this.maticClient_.logger.log("block info from API", err);
            return this.getRootBlockInfo(txBlockNumber);
        });
    }

    private getBlockProof(txBlockNumber: number, rootBlockInfo: { start, end }) {
        return ProofUtil.buildBlockProof(
            this.maticClient_,
            parseInt(rootBlockInfo.start, 10),
            parseInt(rootBlockInfo.end, 10),
            parseInt(txBlockNumber + '', 10)
        );
    }

    private getBlockProofFromAPI(txBlockNumber: number, rootBlockInfo: { start, end }) {

        return service.network.getProof(
            this.config.network,
            rootBlockInfo.start,
            rootBlockInfo.end,
            txBlockNumber
        ).then(blockProof => {
            if (!blockProof) {
                throw Error('Network API Error');
            }
            this.maticClient_.logger.log("block proof from API 1");
            return blockProof;
        }).catch(_ => {
            return this.getBlockProof(txBlockNumber, rootBlockInfo);
        });
    }

    async buildPayloadForExit(burnTxHash: string, logEventSig: string, isFast: boolean) {

        if (isFast && !service.network) {
            new ErrorHelper(ERROR_TYPE.ProofAPINotSet).throw();
        }

        const blockInfo = await this.getChainBlockInfo(
            burnTxHash
        );

        if (!this.isCheckPointed_(blockInfo)) {
            throw new Error(
                'Burn transaction has not been checkpointed as yet'
            );
        }

        const { txBlockNumber } = blockInfo;

        const [receipt, block] = await Promise.all([
            this.maticClient_.getTransactionReceipt(burnTxHash),
            this.maticClient_.getBlockWithTransaction(txBlockNumber)
        ]);

        const rootBlockInfo = await (
            isFast ? this.getRootBlockInfoFromAPI(txBlockNumber) :
                this.getRootBlockInfo(txBlockNumber)
        );

        // build block proof
        const blockProof = await (
            isFast ? this.getBlockProofFromAPI(txBlockNumber, rootBlockInfo) :
                this.getBlockProof(txBlockNumber, rootBlockInfo)
        );

        const receiptProof: any = await ProofUtil.getReceiptProof(
            receipt,
            block,
            this.maticClient_,
            this.requestConcurrency
        );

        const logIndex = this.getLogIndex_(
            logEventSig, receipt
        );

        return this._encodePayload(
            rootBlockInfo.blockNumber,
            blockProof,
            txBlockNumber,
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

    getExitHash(burnTxHash, logEventSig) {
        let lastChildBlock: string,
            receipt: ITransactionReceipt,
            block: IBlockWithTransaction;

        return Promise.all([
            this.rootChain.getLastChildBlock(),
            this.maticClient_.getTransactionReceipt(burnTxHash)
        ]).then(result => {
            lastChildBlock = result[0];
            receipt = result[1];
            return this.maticClient_.getBlockWithTransaction(
                receipt.blockNumber
            );
        }).then(blockResult => {
            block = blockResult;
            if (!this.isCheckPointed_({ lastChildBlock: lastChildBlock, txBlockNumber: receipt.blockNumber })) {
                this.maticClient_.logger.error(ERROR_TYPE.BurnTxNotCheckPointed).throw();
            }
            return ProofUtil.getReceiptProof(
                receipt,
                block,
                this.maticClient_,
                this.requestConcurrency
            );
        }).then((receiptProof: any) => {
            const logIndex = this.getLogIndex_(logEventSig, receipt);
            const nibbleArr = [];
            receiptProof.path.forEach(byte => {
                nibbleArr.push(Buffer.from('0' + (byte / 0x10).toString(16), 'hex'));
                nibbleArr.push(Buffer.from('0' + (byte % 0x10).toString(16), 'hex'));
            });

            return this.maticClient_.etheriumSha3(
                receipt.blockNumber, ethUtils.bufferToHex(Buffer.concat(nibbleArr)), logIndex
            );
        });
    }
}