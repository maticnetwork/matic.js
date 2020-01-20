import assert from 'assert'
import ethUtils from 'ethereumjs-util'
import Contract from 'web3/eth/contract'

import BN from 'bn.js'
import WithdrawManagerArtifact from 'matic-protocol/contracts-core/artifacts/WithdrawManager.json'
import ERC20PredicateArtifact from 'matic-protocol/contracts-core/artifacts/ERC20Predicate.json'
import ERC721PredicateArtifact from 'matic-protocol/contracts-core/artifacts/ERC721Predicate.json'
import MintableERC721PredicateArtifact from 'matic-protocol/contracts-core/artifacts/MintableERC721Predicate.json'
import ChildERC721MintableArtifact from 'matic-protocol/contracts-core/artifacts/ChildERC721Mintable.json'
import Proofs from 'matic-protocol/contracts-core/helpers/proofs.js'

import { address, SendOptions } from '../types/Common'
import Web3Client from '../common/Web3Client'
import ContractsBase from '../common/ContractsBase'
import RootChain from './RootChain'
import Registry from './Registry'

const logger = {
  info: require('debug')('maticjs:WithdrawManager'),
  debug: require('debug')('maticjs:debug:WithdrawManager'),
}

export default class WithdrawManager extends ContractsBase {
  static WITHDRAW_EVENT_SIG = '0x9b1bfa7fa9ee420a16e124f794c35ac9f90472acc99140eb2f6447c714cad8eb'.toLowerCase()

  public withdrawManager: Contract
  public erc20Predicate: Contract
  public erc721Predicate: Contract
  private rootChain: RootChain
  private registry: Registry

  constructor(
    withdrawManager: address,
    rootChain: RootChain,
    web3Client: Web3Client,
    registry: Registry,
  ) {
    super(web3Client)
    this.withdrawManager = new this.web3Client.parentWeb3.eth.Contract(
      WithdrawManagerArtifact.abi,
      withdrawManager,
    )
    this.rootChain = rootChain
    this.registry = registry
  }

  async initialize() {
    const erc20PredicateAddress = await this.registry.registry.methods
      .erc20Predicate()
      .call()
    const erc721PredicateAddress = await this.registry.registry.methods
      .erc721Predicate()
      .call()
    this.erc20Predicate = new this.web3Client.parentWeb3.eth.Contract(
      ERC20PredicateArtifact.abi,
      erc20PredicateAddress,
    )
    this.erc721Predicate = new this.web3Client.parentWeb3.eth.Contract(
      ERC721PredicateArtifact.abi,
      erc721PredicateAddress,
    )
  }

  async burnERC20Tokens(
    token: address,
    amount: BN | string,
    options?: SendOptions
  ) {
    const txObject = this.getERC20TokenContract(token).methods.withdraw(this.encode(amount))

    const _options = await this._fillOptions(
      options,
      txObject,
      this.web3Client.getMaticWeb3(),
    )

    if (options.encodeAbi) {
      _options.data = txObject.encodeABI()
      _options.to = token
      return _options
    }

    return this.web3Client.send(txObject, _options)
  }

  async burnERC721Token(
    token: address,
    tokenId: BN | string,
    options?: SendOptions
  ) {
    const txObject = this.getERC721TokenContract(token).methods.withdraw(this.encode(tokenId))

    const _options = await this._fillOptions(
      options,
      txObject,
      this.web3Client.getMaticWeb3(),
    )

    if (options.encodeAbi) {
      _options.data = txObject.encodeABI()
      _options.to = token
      return _options
    }

    return this.web3Client.send(txObject, _options)
  }

  async processExits(token: address, options?: SendOptions) {
    options = options || {}
    if (!options || !options.gas || options.gas < 2000000) {
      console.log('processExits can be gas expensive, sending in 2000000 gas but even this might not be enough') // eslint-disable-line
      options.gas = 2000000
    }
    const txObject = this.withdrawManager.methods.processExits(token)

    const _options = await this._fillOptions(
      options,
      txObject,
      this.web3Client.getParentWeb3(),
    )

    if (options.encodeAbi) {
      _options.data = txObject.encodeABI()
      _options.to = this.withdrawManager.options.address
      return _options
    }

    return this.web3Client.send(txObject, options)
  }

  async startExitWithBurntERC20Tokens(burnTxHash, options?) {
    const payload = await this._buildPayloadForExit(burnTxHash)
    const txObject = this.erc20Predicate.methods.startExitWithBurntTokens(
      payload,
    )

    const _options = await this._fillOptions(
      options,
      txObject,
      this.web3Client.getParentWeb3(),
    )

    if (options.encodeAbi) {
      _options.data = txObject.encodeABI()
      _options.to = this.erc20Predicate.options.address
      return _options
    }
    return this.web3Client.send(txObject, _options)
  }

  async startExitWithBurntERC721Tokens(burnTxHash, options?) {
    const payload = await this._buildPayloadForExit(burnTxHash)
    const txObject = this.erc721Predicate.methods.startExitWithBurntTokens(
      payload,
    )

    const _options = await this._fillOptions(
      options,
      txObject,
      this.web3Client.getParentWeb3(),
    )

    if (options.encodeAbi) {
      _options.data = txObject.encodeABI()
      _options.to = this.erc721Predicate.options.address
      return _options
    }
    return this.web3Client.send(txObject, _options)
  }

  /**
   * Start an exit for a token that was minted and burnt on the side chain
   * Wrapper over contract call: [MintableERC721Predicate.startExitForMintableBurntToken](https://github.com/maticnetwork/contracts/blob/e2cb462b8487921463090b0bdcdd7433db14252b/contracts/root/predicates/MintableERC721Predicate.sol#L31)
   * @param burnTxHash Hash of the burn transaction on Matic
   * @param predicate address of MintableERC721Predicate
   */
  async startExitForMintableBurntToken(burnTxHash, predicate: address, options?) {
    const { payload, mint } = await this._buildPayloadAndFindMintTransaction(burnTxHash)
    const _predicate = new this.web3Client.parentWeb3.eth.Contract(MintableERC721PredicateArtifact.abi, predicate)
    const txObject = _predicate.methods.startExitForMintableBurntToken(payload, mint)
    const _options = await this._fillOptions(options, txObject, this.web3Client.parentWeb3)
    return this.web3Client.send(txObject, _options)
  }

  /**
   * Start an exit for a token with metadata (token uri) that was minted and burnt on the side chain
   * Wrapper over contract call: [MintableERC721Predicate.startExitForMetadataMintableBurntToken](https://github.com/maticnetwork/contracts/blob/e2cb462b8487921463090b0bdcdd7433db14252b/contracts/root/predicates/MintableERC721Predicate.sol#L66)
   * @param burnTxHash Hash of the burn transaction on Matic
   * @param predicate address of MintableERC721Predicate
   */
  async startExitForMetadataMintableBurntToken(burnTxHash, predicate: address, options?) {
    const { payload, mint } = await this._buildPayloadAndFindMintTransaction(burnTxHash)
    const _predicate = new this.web3Client.parentWeb3.eth.Contract(MintableERC721PredicateArtifact.abi, predicate)
    const txObject = _predicate.methods.startExitForMetadataMintableBurntToken(payload, mint)
    const _options = await this._fillOptions(options, txObject, this.web3Client.parentWeb3)
    return this.web3Client.send(txObject, _options)
  }

  private async _buildPayloadAndFindMintTransaction(burnTxHash) {
    const payload = await this._buildPayloadForExit(burnTxHash)
    const burnReceipt = await this.web3Client.web3.eth.getTransactionReceipt(burnTxHash)
    const withdrawEvent = burnReceipt.logs.find(
      l => l.topics[0].toLowerCase() === WithdrawManager.WITHDRAW_EVENT_SIG,
    )
    const tokenId = withdrawEvent.data
    logger.debug({ burnTxHash, burnReceipt, withdrawEvent, tokenId })
    const contract = new this.web3Client.web3.eth.Contract(ChildERC721MintableArtifact.abi, burnReceipt.to)
    const mintEvents = await contract.getPastEvents('Transfer', { filter: { tokenId }, fromBlock: 0, toBlock: 'latest' })
    logger.debug({ mintEvents })
    if (!mintEvents || !mintEvents.length) {
      throw new Error('Could not retrieve the mint event')
    }
    const mintTxHash = mintEvents.find(event => event.raw.topics[3] === tokenId)
      .transactionHash
    let mint: any = await this.web3Client.web3.eth.getTransaction(mintTxHash)
    mint = ethUtils.bufferToHex(await Proofs.getTxBytes(mint))
    return { payload, mint }
  }

  private async _buildPayloadForExit(burnTxHash) {
    // check checkpoint
    const lastChildBlock = await this.rootChain.getLastChildBlock()
    const burnTx = await this.web3Client
      .getMaticWeb3()
      .eth.getTransaction(burnTxHash)
    const receipt = await this.web3Client
      .getMaticWeb3()
      .eth.getTransactionReceipt(burnTxHash)
    const block: any = await this.web3Client
      .getMaticWeb3()
      .eth.getBlock(burnTx.blockNumber, true /* returnTransactionObjects */)

    logger.info( { 'burnTx.blockNumber': burnTx.blockNumber, lastCheckPointedBlockNumber: lastChildBlock } )
    assert.ok(
      new BN(lastChildBlock).gte(new BN(burnTx.blockNumber)),
      'Burn transaction has not been checkpointed as yet',
    )
    const headerBlockNumber = await this.rootChain.findHeaderBlockNumber(burnTx.blockNumber)
    const headerBlock = await this.web3Client.call(
      this.rootChain
        .getRawContract()
        .methods.headerBlocks(this.encode(headerBlockNumber)),
    )
    logger.info({ 'headerBlockNumber': headerBlockNumber.toString(), headerBlock })

    // build block proof
    const blockProof = await Proofs.buildBlockProof(
      this.web3Client.getMaticWeb3(),
      headerBlock.start,
      headerBlock.end,
      burnTx.blockNumber,
    )
    // console.log('blockProof', blockProof)
    const receiptProof = await Proofs.getReceiptProof(
      receipt,
      block,
      this.web3Client.getMaticWeb3(),
    )
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
      // @todo logIndex can vary
      1, // logIndex
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
      ]),
    )
  }
}
