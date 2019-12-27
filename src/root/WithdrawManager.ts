import assert from 'assert'
import ethUtils from 'ethereumjs-util'
import bluebird from 'bluebird'
import Contract from 'web3/eth/contract'

import BN from 'bn.js'
import WithdrawManagerArtifact from 'matic-protocol/contracts-core/artifacts/WithdrawManager.json'
import ERC20PredicateArtifact from 'matic-protocol/contracts-core/artifacts/ERC20Predicate.json'
import ERC721PredicateArtifact from 'matic-protocol/contracts-core/artifacts/ERC721Predicate.json'
import Proofs from 'matic-protocol/contracts-core/helpers/proofs.js'

import { address, SendOptions } from '../types/Common'
import Web3Client from '../common/Web3Client'
import ContractsBase from '../common/ContractsBase'
import RootChain from './RootChain'
import Registry from './Registry'

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
    options?: SendOptions,
  ) {
    const txObject = this.getERC20TokenContract(token).methods.withdraw(
      this.encode(amount),
    )

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

  async burnERC721Token(token: address, tokenId: string, options?: SendOptions) {
    const txObject = this.getERC721TokenContract(token).methods.withdraw(
      tokenId
    )

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

  async processExits(rootTokenAddress: address, options?: SendOptions) {
    options = options || {}
    if (!options || !options.gas || options.gas < 2000000) {
      console.log(
        'processExits can be gas expensive, sending in 2000000 gas but even this might not be enough',
      )
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
      _options.to = token
      return _options
    }

    return this.web3Client.send(
      this.withdrawManager.methods.processExits(token),
      options,
    )
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
      return _options
    }
    return this.web3Client.send(txObject, _options)
  }

  async startExitForMintWithTokenURITokens(burnTxHash, options?) {
    const { payload, mint } = await this._startExitForMintWithTokenURITokens(
      burnTxHash,
    )
    return this.web3Client.send(
      this.erc721Predicate.methods.startExitForMintWithTokenURITokens(
        payload,
        mint,
      ),
      options,
    )
  }

  async startBulkExitForMintWithTokenURITokens(burnTxs, options?) {
    const payloads = []
    const mints = []
    // note that these calls will be simultaneous
    await bluebird.map(burnTxs, async tx => {
      const { payload, mint } = await this._startExitForMintWithTokenURITokens(
        tx,
      )
      payloads.push(payload)
      mints.push(mint)
    })
    return this.web3Client.send(
      this.erc721Predicate.methods.startBulkExitForMintWithTokenURITokens(
        ethUtils.rlp.encode(payloads),
        ethUtils.rlp.encode(mints),
      ),
      options,
    )
  }

  private async _startExitForMintWithTokenURITokens(burnTxHash, options?) {
    const payload = await this._buildPayloadForExit(burnTxHash)
    const burnReceipt = await this.web3Client
      .getMaticWeb3()
      .eth.getTransactionReceipt(burnTxHash)
    const withdrawEvent = burnReceipt.logs.find(
      l => l.topics[0].toLowerCase() === WithdrawManager.WITHDRAW_EVENT_SIG,
    )
    const tokenId = withdrawEvent.data
    const mintEvents = await this.getERC721TokenContract(
      burnReceipt.to,
    ).getPastEvents('Transfer', {
      filter: { tokenId },
      fromBlock: 0,
      toBlock: 'latest',
    })
    const mintTxHash = mintEvents.find(event => event.raw.topics[3] === tokenId)
      .transactionHash
    console.log('mintTxHash', mintTxHash)
    let mint: any = await this.web3Client
      .getMaticWeb3()
      .eth.getTransaction(mintTxHash)
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

    console.log(
      'burnTx.blockNumber',
      burnTx.blockNumber,
      'lastChildBlock',
      lastChildBlock,
    )
    assert.ok(
      new BN(lastChildBlock).gte(new BN(burnTx.blockNumber)),
      'Burn transaction has not been checkpointed as yet',
    )
    const headerBlockNumber = await this.rootChain.findHeaderBlockNumber(
      burnTx.blockNumber,
    )
    const headerBlock = await this.web3Client.call(
      this.rootChain
        .getRawContract()
        .methods.headerBlocks(this.encode(headerBlockNumber)),
    )
    console.log(
      'headerBlockNumber',
      headerBlockNumber.toString(),
      'headerBlock',
      headerBlock,
    )
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
