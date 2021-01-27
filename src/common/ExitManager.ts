import BN from 'bn.js'
import assert from 'assert'
import ethUtils from 'ethereumjs-util'
import axios from 'axios'

import Web3Client from './Web3Client'
import ContractsBase from './ContractsBase'
import RootChain from '../root/RootChain'
import { MaticClientInitializationOptions } from '../types/Common'
import Proofs from '../libs/ProofsUtil'

import Web3 from 'web3'
const web3 = new Web3()
const hash: Web3['utils']['soliditySha3'] = web3.utils.soliditySha3

const logger = {
  info: require('debug')('maticjs:WithdrawManager'),
  debug: require('debug')('maticjs:debug:WithdrawManager'),
}

export default class ExitManager extends ContractsBase {
  private rootChain: RootChain
  private networkApiUrl

  constructor(rootChain: RootChain, options: MaticClientInitializationOptions, web3Client: Web3Client) {
    super(web3Client, options.network)
    this.rootChain = rootChain
    this.networkApiUrl = options.network.Matic.NetworkAPI
  }

  async buildPayloadForExit(burnTxHash, logEventSig) {
    // check checkpoint
    const lastChildBlock = await this.rootChain.getLastChildBlock()
    const burnTx = await this.web3Client.getMaticWeb3().eth.getTransaction(burnTxHash)
    const receipt = await this.web3Client.getMaticWeb3().eth.getTransactionReceipt(burnTxHash)
    const block: any = await this.web3Client
      .getMaticWeb3()
      .eth.getBlock(burnTx.blockNumber, true /* returnTransactionObjects */)

    logger.info({ 'burnTx.blockNumber': burnTx.blockNumber, lastCheckPointedBlockNumber: lastChildBlock })
    assert.ok(
      new BN(lastChildBlock).gte(new BN(burnTx.blockNumber)),
      'Burn transaction has not been checkpointed as yet'
    )
    const headerBlockNumber = await this.rootChain.findHeaderBlockNumber(burnTx.blockNumber)
    const headerBlock = await this.web3Client.call(
      this.rootChain.rootChain.methods.headerBlocks(this.encode(headerBlockNumber))
    )
    logger.info({ headerBlockNumber: headerBlockNumber.toString(), headerBlock })

    // build block proof
    const blockProof = await Proofs.buildBlockProof(
      this.web3Client.getMaticWeb3(),
      parseInt(headerBlock.start, 10),
      parseInt(headerBlock.end, 10),
      parseInt(burnTx.blockNumber + '', 10)
    )

    const receiptProof: any = await Proofs.getReceiptProof(receipt, block, this.web3Client.getMaticWeb3())

    // In 👇 ternary condition first one gets satisfied only for Plasma start 
    // withdraw operations i.e. ERC20, ERC721 withdraw
    //
    // Event signatures : 
    // 1. https://github.com/maticnetwork/contracts/blob/45aa3a62264f15b6bb4d50a3fa8f6ab7b9cde829/contracts/child/ChildERC721.sol#L16-L20
    // 2. https://github.com/maticnetwork/contracts/blob/45aa3a62264f15b6bb4d50a3fa8f6ab7b9cde829/contracts/child/BaseERC20.sol#L14-L20 
    //
    // We get to reach second one if it's a POS exit operation
    const logIndex = logEventSig == '0x9b1bfa7fa9ee420a16e124f794c35ac9f90472acc99140eb2f6447c714cad8eb' ||
      logEventSig == '0xebff2602b3f468259e1e99f613fed6691f3a6526effe6ef3e768ba7ae7a36c4f'
      ? receipt.logs.findIndex(
        log =>
          log.topics[0].toLowerCase() == logEventSig.toLowerCase()
      )
      : receipt.logs.findIndex(
        log =>
          log.topics[0].toLowerCase() == logEventSig.toLowerCase() &&
          log.topics[2].toLowerCase() == '0x0000000000000000000000000000000000000000000000000000000000000000'
      )

    assert.ok(logIndex > -1, 'Log not found in receipt')

    return this._encodePayload(
      headerBlockNumber,
      blockProof,
      burnTx.blockNumber,
      block.timestamp,
      Buffer.from(block.transactionsRoot.slice(2), 'hex'),
      Buffer.from(block.receiptsRoot.slice(2), 'hex'),
      Proofs.getReceiptBytes(receipt), // rlp encoded
      receiptProof.parentNodes,
      receiptProof.path,
      logIndex
    )
  }

  async buildPayloadForExitHermoine(burnTxHash, logEventSig) {
    // check checkpoint
    const lastChildBlock = await this.rootChain.getLastChildBlock()
    const receipt = await this.web3Client.getMaticWeb3().eth.getTransactionReceipt(burnTxHash)
    const block: any = await this.web3Client
      .getMaticWeb3()
      .eth.getBlock(receipt.blockNumber, true /* returnTransactionObjects */)
    logger.info({ 'receipt.blockNumber': receipt.blockNumber, lastCheckPointedBlockNumber: lastChildBlock })
    assert.ok(
      new BN(lastChildBlock).gte(new BN(receipt.blockNumber)),
      'Burn transaction has not been checkpointed as yet'
    )
    let blockIncludedResponse = await axios.get(this.networkApiUrl + '/block-included/' + receipt.blockNumber)
    let headerBlock = blockIncludedResponse.data
    // build block proof

    const start = parseInt(headerBlock.start, 10)
    const end = parseInt(headerBlock.end, 10)
    const number = parseInt(receipt.blockNumber + '', 10)
    let blockProofResponse = await axios.get(
      `${this.networkApiUrl}/block-proof?start=${start}&end=${end}&number=${number}`
    )
    const blockProof = blockProofResponse.data.proof

    const receiptProof: any = await Proofs.getReceiptProof(receipt, block, this.web3Client.getMaticWeb3())

    // In 👇 ternary condition first one gets satisfied only for Plasma start 
    // withdraw operations i.e. ERC20, ERC721 withdraw
    //
    // Event signatures : 
    // 1. https://github.com/maticnetwork/contracts/blob/45aa3a62264f15b6bb4d50a3fa8f6ab7b9cde829/contracts/child/ChildERC721.sol#L16-L20
    // 2. https://github.com/maticnetwork/contracts/blob/45aa3a62264f15b6bb4d50a3fa8f6ab7b9cde829/contracts/child/BaseERC20.sol#L14-L20 
    //
    // We get to reach second one if it's a POS exit operation
    const logIndex = logEventSig == '0x9b1bfa7fa9ee420a16e124f794c35ac9f90472acc99140eb2f6447c714cad8eb' ||
      logEventSig == '0xebff2602b3f468259e1e99f613fed6691f3a6526effe6ef3e768ba7ae7a36c4f'
      ? receipt.logs.findIndex(
        log =>
          log.topics[0].toLowerCase() == logEventSig.toLowerCase()
      )
      : receipt.logs.findIndex(
        log =>
          log.topics[0].toLowerCase() == logEventSig.toLowerCase() &&
          log.topics[2].toLowerCase() == '0x0000000000000000000000000000000000000000000000000000000000000000'
      )

    assert.ok(logIndex > -1, 'Log not found in receipt')
    return this._encodePayload(
      headerBlock.headerBlockNumber,
      blockProof,
      receipt.blockNumber,
      block.timestamp,
      Buffer.from(block.transactionsRoot.slice(2), 'hex'),
      Buffer.from(block.receiptsRoot.slice(2), 'hex'),
      Proofs.getReceiptBytes(receipt), // rlp encoded
      receiptProof.parentNodes,
      receiptProof.path,
      logIndex
    )
  }

  async getExitHash(burnTxHash, logEventSig) {
    const lastChildBlock = await this.rootChain.getLastChildBlock()
    const receipt = await this.web3Client.getMaticWeb3().eth.getTransactionReceipt(burnTxHash)
    const block: any = await this.web3Client
      .getMaticWeb3()
      .eth.getBlock(receipt.blockNumber, true /* returnTransactionObjects */)

    assert.ok(
      new BN(lastChildBlock).gte(new BN(receipt.blockNumber)),
      'Burn transaction has not been checkpointed as yet'
    )

    const receiptProof: any = await Proofs.getReceiptProof(receipt, block, this.web3Client.getMaticWeb3())
    const logIndex = receipt.logs.findIndex(
      log =>
        log.topics[0].toLowerCase() == logEventSig.toLowerCase() &&
        log.topics[2].toLowerCase() == '0x0000000000000000000000000000000000000000000000000000000000000000'
    )
    assert.ok(logIndex > -1, 'Log not found in receipt')

    const nibbleArr = []
    receiptProof.path.forEach(byte => {
      nibbleArr.push(Buffer.from('0' + (byte / 0x10).toString(16), 'hex'))
      nibbleArr.push(Buffer.from('0' + (byte % 0x10).toString(16), 'hex'))
    })

    return hash(receipt.blockNumber, ethUtils.bufferToHex(Buffer.concat(nibbleArr)), logIndex)
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
    )
  }
}
