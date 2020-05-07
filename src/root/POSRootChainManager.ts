import BN from 'bn.js'
import assert from 'assert'
import ethUtils from 'ethereumjs-util'
import Contract from 'web3/eth/contract'

import RootChainManagerArtifact from 'matic-pos-portal/artifacts/RootChainManager.json'
import ChildTokenArtifact from 'matic-pos-portal/artifacts/ChildToken.json'

import Proofs from 'matic-protocol/contracts-core/helpers/proofs.js'

import ContractsBase from '../common/ContractsBase'
import { address, SendOptions } from '../types/Common'
import Web3Client from '../common/Web3Client'
import RootChain from './RootChain'

const logger = {
  info: require('debug')('maticjs:POSRootChainManager'),
  debug: require('debug')('maticjs:debug:POSRootChainManager'),
}

export default class POSRootChainManager extends ContractsBase {
  public posRootChainManager: Contract
  public rootChain: RootChain
  private TRANSFER_EVENT_SIG = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'

  constructor(posRootChainManager: address, rootChain: RootChain, web3Client: Web3Client) {
    super(web3Client)
    this.posRootChainManager = new this.web3Client.parentWeb3.eth.Contract(
      RootChainManagerArtifact.abi,
      posRootChainManager
    )
    this.rootChain = rootChain
  }

  async approveERC20(rootToken: address, amount: BN | string, options?: SendOptions) {
    const txObject = this.getERC20TokenContract(rootToken, true).methods.approve(
      this.posRootChainManager.options.address,
      this.encode(amount)
    )

    const _options = await this._fillOptions(options, txObject, this.web3Client.getParentWeb3())

    if (options.encodeAbi) {
      _options.data = txObject.encodeABI()
      _options.to = rootToken
      return _options
    }

    return this.web3Client.send(txObject, _options)
  }

  async depositERC20ForUser(rootToken: address, amount: BN | string, user: address, options?: SendOptions) {
    const txObject = this.posRootChainManager.methods.depositFor(user, rootToken, this.encode(amount))
    const _options = await this._fillOptions(options, txObject, this.web3Client.getParentWeb3())

    if (options.encodeAbi) {
      _options.data = txObject.encodeABI()
      _options.to = this.posRootChainManager.options.address
      return _options
    }

    return this.web3Client.send(txObject, _options)
  }

  async depositEtherForUser(amount: BN | string, user: address, options: SendOptions = {}) {
    const txObject = this.posRootChainManager.methods.depositEtherFor(user)

    const _options = await this._fillOptions(
      Object.assign(options, { value: this.encode(amount) }),
      txObject,
      this.web3Client.getParentWeb3()
    )

    if (options.encodeAbi) {
      _options.data = txObject.encodeABI()
      _options.to = this.posRootChainManager.options.address
      return _options
    }

    return this.web3Client.send(txObject, _options)
  }

  async burnERC20(childToken: address, amount: BN | string, options?: SendOptions) {
    const childTokenContract = new this.web3Client.web3.eth.Contract(ChildTokenArtifact.abi, childToken)
    const txObject = childTokenContract.methods.withdraw(this.encode(amount))

    const _options = await this._fillOptions(options, txObject, this.web3Client.getMaticWeb3())

    if (options.encodeAbi) {
      _options.data = txObject.encodeABI()
      _options.to = childToken
      return _options
    }

    return this.web3Client.send(txObject, _options)
  }

  async exitERC20(burnTxHash, options?) {
    const payload = await this._buildPayloadForExit(burnTxHash)
    const txObject = this.posRootChainManager.methods.exit(payload)

    const _options = await this._fillOptions(options, txObject, this.web3Client.getParentWeb3())

    if (options.encodeAbi) {
      _options.data = txObject.encodeABI()
      _options.to = this.posRootChainManager.options.address
      return _options
    }
    return this.web3Client.send(txObject, _options)
  }

  private async _buildPayloadForExit(burnTxHash) {
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
      this.rootChain.getRawContract().methods.headerBlocks(this.encode(headerBlockNumber))
    )
    logger.info({ headerBlockNumber: headerBlockNumber.toString(), headerBlock })

    // build block proof
    const blockProof = await Proofs.buildBlockProof(
      this.web3Client.getMaticWeb3(),
      headerBlock.start,
      headerBlock.end,
      burnTx.blockNumber
    )

    const receiptProof = await Proofs.getReceiptProof(receipt, block, this.web3Client.getMaticWeb3())

    const logIndex = receipt.logs.findIndex(log => log.topics[0].toLowerCase() == this.TRANSFER_EVENT_SIG)
    assert.ok(logIndex > -1, 'Burn log not found in receipt')

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
      logIndex,
      burnTxHash
    )
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
    logIndex,
    burnTxHash
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
        ethUtils.bufferToHex(ethUtils.rlp.encode(path)),
        logIndex,
        burnTxHash,
      ])
    )
  }
}
