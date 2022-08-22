import { RootChain } from "./root_chain";
import { Converter, ProofUtil, Web3SideChainClient } from "../utils";
import { bufferToHex, rlp } from "ethereumjs-util";
import { IBlockWithTransaction, ITransactionReceipt } from "../interfaces";
import { service } from "../services";
import { BaseBigNumber, BaseWeb3Client } from "../abstracts";
import { ErrorHelper } from "../utils/error_helper";
import { ERROR_TYPE, IBaseClientConfig, IRootBlockInfo, utils } from "..";

interface IChainBlockInfo {
    lastChildBlock: string;
    txBlockNumber: number;
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

    private getAllLogIndices_(logEventSig: string, receipt: ITransactionReceipt) {
      let logIndices = [];

      switch (logEventSig) {
          case '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef':
          case '0xf94915c6d1fd521cee85359239227480c7e8776d7caf1fc3bacad5c269b66a14':
            logIndices = receipt.logs.reduce(
                  (_, log, index) =>
                      ((log.topics[0].toLowerCase() === logEventSig.toLowerCase() &&
                      log.topics[2].toLowerCase() === '0x0000000000000000000000000000000000000000000000000000000000000000') &&
                      logIndices.push(index), logIndices), []
              );
              break;

          case '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62':
          case '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb':
              logIndices = receipt.logs.reduce(
                (_, log, index) =>
                    ((log.topics[0].toLowerCase() === logEventSig.toLowerCase() &&
                    log.topics[3].toLowerCase() === '0x0000000000000000000000000000000000000000000000000000000000000000') &&
                    logIndices.push(index), logIndices), []
            );
            break;
          
          case '0xf871896b17e9cb7a64941c62c188a4f5c621b86800e3d15452ece01ce56073df':
              logIndices = receipt.logs.reduce(
                (_, log, index) =>
                    ((log.topics[0].toLowerCase() === '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' &&
                    log.topics[2].toLowerCase() === '0x0000000000000000000000000000000000000000000000000000000000000000') &&
                    logIndices.push(index), logIndices), []
            );
            break;

          default:
            logIndices = receipt.logs.reduce(
              (_, log, index) =>
                  ((log.topics[0].toLowerCase() === logEventSig.toLowerCase()) &&
                  logIndices.push(index), logIndices), []
          );
      }
      if (logIndices.length === 0) {
          throw new Error("Log not found in receipt");
      }
      return logIndices;
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
        return new utils.BN(data.lastChildBlock).gte(
            new utils.BN(data.txBlockNumber)
        );
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

    /**
     * returns info about block number existance on parent chain
     * 1. root block number, 
     * 2. start block number, 
     * 3. end block number 
     *
     * @private
     * @param {number} txBlockNumber - transaction block number on child chain
     * @return {*} 
     * @memberof ExitUtil
     */
    private getRootBlockInfo(txBlockNumber: number) {
        // find in which block child was included in parent
        let rootBlockNumber: BaseBigNumber;
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
            return {
                // header block number - root block number in which child block exist 
                headerBlockNumber: rootBlockNumber,
                // range of block
                // end - block end number
                end: rootBlockInfo.end.toString(),
                // start - block start number
                start: rootBlockInfo.start.toString(),
            } as IRootBlockInfo;
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

    buildPayloadForExit(burnTxHash: string, logEventSig: string, isFast: boolean, index = 0) {

        if (isFast && !service.network) {
            new ErrorHelper(ERROR_TYPE.ProofAPINotSet).throw();
        }

        if (index < 0) {
          throw new Error('Index must not be a negative integer');
        }

        let txBlockNumber: number,
            rootBlockInfo: IRootBlockInfo,
            receipt: ITransactionReceipt,
            block: IBlockWithTransaction,
            blockProof;

        return this.getChainBlockInfo(
            burnTxHash
        ).then(blockInfo => {
            if (!this.isCheckPointed_(blockInfo)) {
                throw new Error(
                    'Burn transaction has not been checkpointed as yet'
                );
            }

            // step 1 - Get Block number from transaction hash
            txBlockNumber = blockInfo.txBlockNumber;
            // step 2-  get transaction receipt from txhash and 
            // block information from block number
            return Promise.all([
                this.maticClient_.getTransactionReceipt(burnTxHash),
                this.maticClient_.getBlockWithTransaction(txBlockNumber)
            ]);
        }).then(result => {
            [receipt, block] = result;
            // step  3 - get information about block saved in parent chain 
            return (
                isFast ? this.getRootBlockInfoFromAPI(txBlockNumber) :
                    this.getRootBlockInfo(txBlockNumber)
            );
        }).then(rootBlockInfoResult => {
            rootBlockInfo = rootBlockInfoResult;
            // step 4 - build block proof
            return (
                isFast ? this.getBlockProofFromAPI(txBlockNumber, rootBlockInfo) :
                    this.getBlockProof(txBlockNumber, rootBlockInfo)
            );
        }).then(blockProofResult => {
            blockProof = blockProofResult;
            // step 5- create receipt proof
            return ProofUtil.getReceiptProof(
                receipt,
                block,
                this.maticClient_,
                this.requestConcurrency
            );
        }).then((receiptProof: any) => {
            // step 6 - encode payload, convert into hex

            // when token index is not 0
            if(index > 0) {
              const logIndices = this.getAllLogIndices_(
                logEventSig, receipt
              );

              if(index >= logIndices.length) {
                throw new Error('Index is grater than the number of tokens in this transaction');
              }

              return this.encodePayload_(
                rootBlockInfo.headerBlockNumber.toNumber(),
                blockProof,
                txBlockNumber,
                block.timestamp,
                Buffer.from(block.transactionsRoot.slice(2), 'hex'),
                Buffer.from(block.receiptsRoot.slice(2), 'hex'),
                ProofUtil.getReceiptBytes(receipt), // rlp encoded
                receiptProof.parentNodes,
                receiptProof.path,
                logIndices[index]
              );
            }

            // when token index is 0
            const logIndex = this.getLogIndex_(
                logEventSig, receipt
            );

            return this.encodePayload_(
                rootBlockInfo.headerBlockNumber.toNumber(),
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
        });
    }

    buildMultiplePayloadsForExit(burnTxHash: string, logEventSig: string, isFast: boolean) {

      if (isFast && !service.network) {
          new ErrorHelper(ERROR_TYPE.ProofAPINotSet).throw();
      }

      let txBlockNumber: number,
          rootBlockInfo: IRootBlockInfo,
          receipt: ITransactionReceipt,
          block: IBlockWithTransaction,
          blockProof;

      return this.getChainBlockInfo(
          burnTxHash
      ).then(blockInfo => {
          if (!this.isCheckPointed_(blockInfo)) {
              throw new Error(
                  'Burn transaction has not been checkpointed as yet'
              );
          }

          // step 1 - Get Block number from transaction hash
          txBlockNumber = blockInfo.txBlockNumber;
          // step 2-  get transaction receipt from txhash and 
          // block information from block number
          return Promise.all([
              this.maticClient_.getTransactionReceipt(burnTxHash),
              this.maticClient_.getBlockWithTransaction(txBlockNumber)
          ]);
      }).then(result => {
          [receipt, block] = result;
          // step  3 - get information about block saved in parent chain 
          return (
              isFast ? this.getRootBlockInfoFromAPI(txBlockNumber) :
                  this.getRootBlockInfo(txBlockNumber)
          );
      }).then(rootBlockInfoResult => {
          rootBlockInfo = rootBlockInfoResult;
          // step 4 - build block proof
          return (
              isFast ? this.getBlockProofFromAPI(txBlockNumber, rootBlockInfo) :
                  this.getBlockProof(txBlockNumber, rootBlockInfo)
          );
      }).then(blockProofResult => {
          blockProof = blockProofResult;
          // step 5- create receipt proof
          return ProofUtil.getReceiptProof(
              receipt,
              block,
              this.maticClient_,
              this.requestConcurrency
          );
      }).then((receiptProof: any) => {
          const logIndices = this.getAllLogIndices_(
              logEventSig, receipt
          );
          const payloads:string[] = [];

          // step 6 - encode payloads, convert into hex
          for (const logIndex of logIndices){
            payloads.push(
              this.encodePayload_(
                rootBlockInfo.headerBlockNumber.toNumber(),
                blockProof,
                txBlockNumber,
                block.timestamp,
                Buffer.from(block.transactionsRoot.slice(2), 'hex'),
                Buffer.from(block.receiptsRoot.slice(2), 'hex'),
                ProofUtil.getReceiptBytes(receipt), // rlp encoded
                receiptProof.parentNodes,
                receiptProof.path,
                logIndex
              )
            );
          }

          return payloads;
      });
  }

    private encodePayload_(
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
        return bufferToHex(
            rlp.encode([
                headerNumber,
                buildBlockProof,
                blockNumber,
                timestamp,
                bufferToHex(transactionsRoot),
                bufferToHex(receiptsRoot),
                bufferToHex(receipt),
                bufferToHex(rlp.encode(receiptParentNodes)),
                bufferToHex(Buffer.concat([Buffer.from('00', 'hex'), path])),
                logIndex,
            ])
        );
    }

    getExitHash(burnTxHash, index, logEventSig) {
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
            let logIndex;
            const nibbleArr = [];
            receiptProof.path.forEach(byte => {
                nibbleArr.push(Buffer.from('0' + (byte / 0x10).toString(16), 'hex'));
                nibbleArr.push(Buffer.from('0' + (byte % 0x10).toString(16), 'hex'));
            });

            if(index > 0) {
              const logIndices = this.getAllLogIndices_(logEventSig, receipt);
              logIndex = logIndices[index];
            }

            logIndex = this.getLogIndex_(logEventSig, receipt);

            return this.maticClient_.etheriumSha3(
                receipt.blockNumber, bufferToHex(Buffer.concat(nibbleArr)), logIndex
            );
        });
    }
}
