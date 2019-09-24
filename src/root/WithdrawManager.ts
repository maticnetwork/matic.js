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
    console.log('erc20PredicateAddress', erc20PredicateAddress)
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
    // const blockProof = '0x03567ec884f64162fb800d96e0a3bcddb507e63fe85fc0af2a804ecea05add499de833ba9f5661d8bcf20557572be8377fad0075c6b8f80893bf7d51604285e2023b1410778af7f76e117e62f2b221e23ee47f06fca092d841798f727f455e548e6b53def3660e5fb84c3a53ac72676597b246f67dc5605f87bafbb931e06fec95cc86cfca0a3459bd01b231d76e06c65176a13c9e3b9280d4a625057edd593852e2ff5a317004fc9df02d09f9348242a7546017d7d8cd971bed26ce4913230d38b0e5a5eb73fa2cabab1d77bfaec04629443cd1932b78f80c63def86624699cdf1e9df99ebfb565ac7dfa76c35624ca1f917206d5ccc0be9a754c398e1af4cc'
    const blockProof = await Proofs.buildBlockProof(
      this.web3Client.getMaticWeb3(),
      // '218278',
      // '218279',
      headerBlock.start,
      headerBlock.end,
      burnTx.blockNumber
    )
    console.log('blockProof', blockProof)
    // const txProof = (await Proofs.getTxProof(burnTx, block)).txParentNodes
    const receiptProof = await Proofs.getReceiptProof(receipt, block, this.web3Client.getMaticWeb3())
    const payload = this.buildPayload(
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
    console.log('payload', payload)
    return this.web3Client.send(
      this.erc20Predicate.methods.startExitWithBurntTokens(payload),
      options
    )
  }

  buildPayload(
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
