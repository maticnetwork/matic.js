import Web3 from 'web3'
import Contract from 'web3/eth/contract'
import { address, SendOptions } from '../types/Common'
import WithdrawManagerArtifact from 'matic-protocol/contracts-core/artifacts/WithdrawManager.json'
import Proofs from 'matic-protocol/contracts-core/helpers/proofs.js'
import ChildERC20Artifact from 'matic-protocol/contracts-core/artifacts/ChildERC20.json'
import ERC20PredicateArtifact from 'matic-protocol/contracts-core/artifacts/ERC20Predicate.json'
import BN from 'bn.js'
import Web3Client from '../common/Web3Client'
import ContractsBase from '../common/ContractsBase'
import RootChain from './RootChain'
import assert from 'assert'
import ethUtils from 'ethereumjs-util'
import Registry from './Registry'

export default class WithdrawManager extends ContractsBase {
  public withdrawManager: Contract
  public erc20Predicate: Contract
  private rootChain: RootChain
  private registry: Registry

  constructor(withdrawManager: address, rootChain: RootChain, web3Client: Web3Client, registry: Registry) {
    super(web3Client)
    this.withdrawManager = new this.web3Client.parentWeb3.eth.Contract(WithdrawManagerArtifact.abi, withdrawManager)
    this.rootChain = rootChain
    this.registry = registry
  }

  async initialize() {
    const erc20PredicateAddress = await this.registry.registry.methods.erc20Predicate().call()
    this.erc20Predicate = new this.web3Client.parentWeb3.eth.Contract(ERC20PredicateArtifact.abi, erc20PredicateAddress)
  }

  burnERC20Tokens(token: address, amount: BN | string, options?: SendOptions) {
    return this.web3Client.sendOnMatic(
      this._getERC20TokenContract(token).methods.withdraw(this.encode(amount)),
      options
    )
  }

  async startExitWithBurntERC20Tokens(burnERC20TxHash, options?) {
    // check checkpoint
    const lastChildBlock = await this.rootChain.getLastChildBlock()
    const burnTx = await this.web3Client.getMaticWeb3().eth.getTransaction(burnERC20TxHash)
    const receipt = await this.web3Client.getMaticWeb3().eth.getTransactionReceipt(burnERC20TxHash)
    const block: any = await this.web3Client.getMaticWeb3().eth.getBlock(burnTx.blockNumber, true /* returnTransactionObjects */)

    console.log('burnTx.blockNumber', burnTx.blockNumber, 'lastChildBlock', lastChildBlock)
    assert.ok(new BN(lastChildBlock).gt(new BN(burnTx.blockNumber)), 'Burn transaction has not been checkpointed as yet')
    const headerBlockNumber = await this.rootChain.findHeaderBlockNumber(burnTx.blockNumber)
    const headerBlock = await this.web3Client.call(
      this.rootChain.getRawContract().methods.headerBlocks(this.encode(headerBlockNumber))
    )
    console.log('headerBlockNumber', headerBlockNumber.toString(), 'headerBlock', headerBlock)
    // build block proof
    const blockProof = await Proofs.buildBlockProof(
      this.web3Client.getMaticWeb3(),
      // '218278',
      // '218279',
      headerBlock.start,
      headerBlock.end,
      burnTx.blockNumber
    )
    console.log('blockProof', blockProof)
    const receiptProof = await Proofs.getReceiptProof(receipt, block, this.web3Client.getMaticWeb3())
    const payload = this._buildPayloadForExit(
      headerBlockNumber,
      blockProof,
      burnTx.blockNumber,
      block.timestamp,
      Buffer.from(block.transactionsRoot.slice(2), 'hex'),
      Buffer.from(block.receiptsRoot.slice(2), 'hex'),
      Proofs.getReceiptBytes(receipt), // rlp encoded
      receiptProof.parentNodes,
      receiptProof.path,
      1 // logIndex
    )
    console.log('startExitWithBurntTokens payload', payload)
    return this.web3Client.send(
      this.erc20Predicate.methods.startExitWithBurntTokens(payload),
      options
    )
  }

  processExits(token: address, options?: SendOptions) {
    options = options || {}
    if (!options || !options.gas || options.gas < 2000000) {
      console.log('processExits can be gas expensive, sending in 2000000 gas but even this might not be enough')
      options.gas = 2000000
    }
    return this.web3Client.send(
      this.withdrawManager.methods.processExits(token),
      options
    )
  }

  private _buildPayloadForExit(
    headerNumber, buildBlockProof, blockNumber, timestamp, transactionsRoot, receiptsRoot, receipt, receiptParentNodes, path, logIndex) {
    return ethUtils.bufferToHex(ethUtils.rlp.encode([
      headerNumber,
      buildBlockProof,
      blockNumber,
      timestamp,
      ethUtils.bufferToHex(transactionsRoot),
      ethUtils.bufferToHex(receiptsRoot),
      ethUtils.bufferToHex(receipt),
      ethUtils.bufferToHex(ethUtils.rlp.encode(receiptParentNodes)),
      ethUtils.bufferToHex(ethUtils.rlp.encode(path)),
      logIndex
    ]))
  }

  private _getERC20TokenContract(token: address) {
    return new this.web3Client.web3.eth.Contract(ChildERC20Artifact.abi, token)
  }
}
