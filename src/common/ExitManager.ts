import BN from 'bn.js'
import assert from 'assert'
import ethUtils from 'ethereumjs-util'
import axios from 'axios'

import Web3Client from './Web3Client'
import ContractsBase from './ContractsBase'
import RootChain from '../root/RootChain'
import { MaticClientInitializationOptions } from '../types/Common'
import Proofs from '../libs/ProofsUtil'

import { soliditySha3 } from 'web3-utils'
const hash = soliditySha3

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
    const burnTx = await this.web3Client.getMaticEth().getTransaction(burnTxHash)
    const receipt = await this.web3Client.getMaticEth().getTransactionReceipt(burnTxHash)
    const block: any = await this.web3Client
      .getMaticEth()
      .getBlock(burnTx.blockNumber, true /* returnTransactionObjects */)

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
      this.web3Client.getMaticEth(),
      parseInt(headerBlock.start, 10),
      parseInt(headerBlock.end, 10),
      parseInt(burnTx.blockNumber + '', 10)
    )

    const receiptProof: any = await Proofs.getReceiptProof(receipt, block, this.web3Client.getMaticEth())

    let logIndex = -1

    switch (logEventSig) {
      case '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef':
      case '0xf94915c6d1fd521cee85359239227480c7e8776d7caf1fc3bacad5c269b66a14':
        logIndex = receipt.logs.findIndex(
          log =>
            log.topics[0].toLowerCase() == logEventSig.toLowerCase() &&
            log.topics[2].toLowerCase() == '0x0000000000000000000000000000000000000000000000000000000000000000'
        )
        break

      case '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62':
      case '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb':
        logIndex = receipt.logs.findIndex(
          log =>
            log.topics[0].toLowerCase() == logEventSig.toLowerCase() &&
            log.topics[3].toLowerCase() == '0x0000000000000000000000000000000000000000000000000000000000000000'
        )
        break

      default:
        logIndex = receipt.logs.findIndex(log => log.topics[0].toLowerCase() == logEventSig.toLowerCase())
    }

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

  async buildPayloadForExitFastMerkle(start, end, blockNumber) {
    // build block proof
    const blockProof = await Proofs.buildBlockProof(
      this.web3Client.getMaticEth(),
      parseInt(start, 10),
      parseInt(end, 10),
      parseInt(blockNumber + '', 10)
    )

    return blockProof
  }

  async buildPayloadForExitHermoine(burnTxHash, logEventSig) {
    // check checkpoint
    const lastChildBlock = await this.rootChain.getLastChildBlock()
    const receipt = await this.web3Client.getMaticEth().getTransactionReceipt(burnTxHash)
    const block: any = await this.web3Client
      .getMaticEth()
      .getBlock(receipt.blockNumber, true /* returnTransactionObjects */)
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
      `${this.networkApiUrl}/fast-merkle-proof?start=${start}&end=${end}&number=${number}`
    )
    const blockProof = blockProofResponse.data.proof

    const receiptProof: any = await Proofs.getReceiptProof(receipt, block, this.web3Client.getMaticEth())

    let logIndex = -1

    switch (logEventSig) {
      case '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef':
      case '0xf94915c6d1fd521cee85359239227480c7e8776d7caf1fc3bacad5c269b66a14':
        logIndex = receipt.logs.findIndex(
          log =>
            log.topics[0].toLowerCase() == logEventSig.toLowerCase() &&
            log.topics[2].toLowerCase() == '0x0000000000000000000000000000000000000000000000000000000000000000'
        )
        break

      case '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62':
      case '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb':
        logIndex = receipt.logs.findIndex(
          log =>
            log.topics[0].toLowerCase() == logEventSig.toLowerCase() &&
            log.topics[3].toLowerCase() == '0x0000000000000000000000000000000000000000000000000000000000000000'
        )
        break

      default:
        logIndex = receipt.logs.findIndex(log => log.topics[0].toLowerCase() == logEventSig.toLowerCase())
    }

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
    const receipt = await this.web3Client.getMaticEth().getTransactionReceipt(burnTxHash)
    const block: any = await this.web3Client
      .getMaticEth()
      .getBlock(receipt.blockNumber, true /* returnTransactionObjects */)

    assert.ok(
      new BN(lastChildBlock).gte(new BN(receipt.blockNumber)),
      'Burn transaction has not been checkpointed as yet'
    )

    const receiptProof: any = await Proofs.getReceiptProof(receipt, block, this.web3Client.getMaticEth())

    let logIndex = -1

    switch (logEventSig) {
      case '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef':
      case '0xf94915c6d1fd521cee85359239227480c7e8776d7caf1fc3bacad5c269b66a14':
        logIndex = receipt.logs.findIndex(
          log =>
            log.topics[0].toLowerCase() == logEventSig.toLowerCase() &&
            log.topics[2].toLowerCase() == '0x0000000000000000000000000000000000000000000000000000000000000000'
        )
        break

      case '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62':
      case '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb':
        logIndex = receipt.logs.findIndex(
          log =>
            log.topics[0].toLowerCase() == logEventSig.toLowerCase() &&
            log.topics[3].toLowerCase() == '0x0000000000000000000000000000000000000000000000000000000000000000'
        )
        break

      default:
      // let's not do anything, this is going to be fail in
      // following `assert`
    }

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
