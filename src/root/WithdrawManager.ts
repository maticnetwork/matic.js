import BN from 'bn.js'
import ethUtils from 'ethereumjs-util'
import { Contract } from 'web3-eth-contract'
import ContractsBase from '../common/ContractsBase'
import ExitManager from '../common/ExitManager'
import Web3Client from '../common/Web3Client'
import Proofs from '../libs/ProofsUtil'
import { address, MaticClientInitializationOptions, SendOptions } from '../types/Common'
import Registry from './Registry'
import RootChain from './RootChain'

const logger = {
  info: require('debug')('maticjs:WithdrawManager'),
  debug: require('debug')('maticjs:debug:WithdrawManager'),
}

export default class WithdrawManager extends ContractsBase {
  static ERC721_WITHDRAW_EVENT_SIG = '0x9b1bfa7fa9ee420a16e124f794c35ac9f90472acc99140eb2f6447c714cad8eb'.toLowerCase()
  static ERC20_WITHDRAW_EVENT_SIG = '0xebff2602b3f468259e1e99f613fed6691f3a6526effe6ef3e768ba7ae7a36c4f'.toLowerCase()

  public withdrawManager: Contract
  public erc20Predicate: Contract
  public erc721Predicate: Contract
  private rootChain: RootChain
  private registry: Registry
  private exitManager: ExitManager

  constructor(
    options: MaticClientInitializationOptions,
    rootChain: RootChain,
    web3Client: Web3Client,
    registry: Registry
  ) {
    super(web3Client, options.network)
    this.withdrawManager = new this.web3Client.parentWeb3.eth.Contract(
      this.network.abi('WithdrawManager'),
      options.withdrawManager
    )
    this.rootChain = rootChain
    this.registry = registry
    this.exitManager = new ExitManager(rootChain, options, web3Client)
  }

  async initialize() {
    const erc20PredicateAddress = await this.registry.registry.methods.erc20Predicate().call()
    const erc721PredicateAddress = await this.registry.registry.methods.erc721Predicate().call()
    this.erc20Predicate = new this.web3Client.parentWeb3.eth.Contract(
      this.network.abi('ERC20Predicate'),
      erc20PredicateAddress
    )
    this.erc721Predicate = new this.web3Client.parentWeb3.eth.Contract(
      this.network.abi('ERC721Predicate'),
      erc721PredicateAddress
    )
  }

  async burnERC20Tokens(token: address, amount: BN | string, options?: SendOptions) {
    let txObject
    if (token === ContractsBase.MATIC_CHILD_TOKEN) {
      txObject = this.getChildMaticContract().methods.withdraw(this.encode(amount))
      options.value = this.encode(amount)
    } else {
      txObject = this.getERC20TokenContract(token).methods.withdraw(this.encode(amount))
    }
    const web3Options = await this.web3Client.fillOptions(txObject, false /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: token })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async burnERC721Token(token: address, tokenId: BN | string, options?: SendOptions) {
    const txObject = this.getERC721TokenContract(token).methods.withdraw(this.encode(tokenId))
    const web3Options = await this.web3Client.fillOptions(txObject, false /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: token })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async processExits(tokens: address | address[], options?: SendOptions) {
    let txObject
    if (Array.isArray(tokens)) {
      txObject = this.withdrawManager.methods.processExitsBatch(tokens)
    } else {
      txObject = this.withdrawManager.methods.processExits(tokens)
    }
    options = options || {}
    if (!options || !options.gas || options.gas < 2000000) {
      logger.info('processExits can be gas expensive, sending in 2000000 gas but even this might not be enough') // eslint-disable-line
      options.gas = 2000000
    }
    const web3Options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: this.withdrawManager.options.address })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async startExitWithBurntERC20Tokens(burnTxHash, options?) {
    const payload = await this.exitManager.buildPayloadForExit(burnTxHash, WithdrawManager.ERC20_WITHDRAW_EVENT_SIG)
    const txObject = this.erc20Predicate.methods.startExitWithBurntTokens(payload)
    const web3Options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: this.erc20Predicate.options.address })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async startExitWithBurntERC20TokensHermoine(burnTxHash, options?) {
    const payload = await this.exitManager.buildPayloadForExitHermoine(
      burnTxHash,
      WithdrawManager.ERC20_WITHDRAW_EVENT_SIG
    )
    const txObject = this.erc20Predicate.methods.startExitWithBurntTokens(payload)
    const web3Options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: this.erc20Predicate.options.address })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async startExitWithBurntERC721Tokens(burnTxHash, options?) {
    const payload = await this.exitManager.buildPayloadForExit(burnTxHash, WithdrawManager.ERC721_WITHDRAW_EVENT_SIG)
    const txObject = this.erc721Predicate.methods.startExitWithBurntTokens(payload)
    const web3Options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: this.erc721Predicate.options.address })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async startExitWithBurntERC721TokensHermoine(burnTxHash, options?) {
    const payload = await this.exitManager.buildPayloadForExitHermoine(
      burnTxHash,
      WithdrawManager.ERC721_WITHDRAW_EVENT_SIG
    )
    const txObject = this.erc721Predicate.methods.startExitWithBurntTokens(payload)
    const web3Options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: this.erc721Predicate.options.address })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async getExitTime(burnTxHash, confirmTxHash) {
    const HALF_EXIT_PERIOD = parseInt(await this.web3Client.call(this.withdrawManager.methods.HALF_EXIT_PERIOD()))
    let blockNumber = (await this.web3Client.getParentWeb3().eth.getTransaction(confirmTxHash)).blockNumber
    let confirmTime = (await this.web3Client.getParentWeb3().eth.getBlock(blockNumber)).timestamp
    let checkPointTime = (await this.rootChain.getCheckpointInclusion(burnTxHash)).createdAt
    let exitTime = Math.max(parseInt(checkPointTime) + 2 * HALF_EXIT_PERIOD, +confirmTime + HALF_EXIT_PERIOD)
    return {
      exitTime,
      exitable: Date.now() / 1000 > exitTime,
    }
  }

  /**
   * Start an exit for a token that was minted and burnt on the side chain
   * Wrapper over contract call: [MintableERC721Predicate.startExitForMintableBurntToken](https://github.com/maticnetwork/contracts/blob/e2cb462b8487921463090b0bdcdd7433db14252b/contracts/root/predicates/MintableERC721Predicate.sol#L31)
   * @param burnTxHash Hash of the burn transaction on Matic
   * @param predicate address of MintableERC721Predicate
   */
  async startExitForMintableBurntToken(burnTxHash, predicate: address, options?) {
    const { payload, mint } = await this._buildPayloadAndFindMintTransaction(burnTxHash)
    const _predicate = new this.web3Client.parentWeb3.eth.Contract(
      this.network.abi('MintableERC721Predicate'),
      predicate
    )
    const txObject = _predicate.methods.startExitForMintableBurntToken(payload, mint)
    const web3Options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    return this.web3Client.send(txObject, web3Options, options)
  }

  /**
   * Start an exit for a token with metadata (token uri) that was minted and burnt on the side chain
   * Wrapper over contract call: [MintableERC721Predicate.startExitForMetadataMintableBurntToken](https://github.com/maticnetwork/contracts/blob/e2cb462b8487921463090b0bdcdd7433db14252b/contracts/root/predicates/MintableERC721Predicate.sol#L66)
   * @param burnTxHash Hash of the burn transaction on Matic
   * @param predicate address of MintableERC721Predicate
   */
  async startExitForMetadataMintableBurntToken(burnTxHash, predicate: address, options?) {
    const { payload, mint } = await this._buildPayloadAndFindMintTransaction(burnTxHash)
    const _predicate = new this.web3Client.parentWeb3.eth.Contract(
      this.network.abi('MintableERC721Predicate'),
      predicate
    )
    const txObject = _predicate.methods.startExitForMetadataMintableBurntToken(payload, mint)
    const web3Options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    return this.web3Client.send(txObject, web3Options, options)
  }

  private async _buildPayloadAndFindMintTransaction(burnTxHash) {
    const payload = await this.exitManager.buildPayloadForExit(burnTxHash, WithdrawManager.ERC721_WITHDRAW_EVENT_SIG)
    const burnReceipt = await this.web3Client.web3.eth.getTransactionReceipt(burnTxHash)
    const withdrawEvent = burnReceipt.logs.find(
      l => l.topics[0].toLowerCase() === WithdrawManager.ERC721_WITHDRAW_EVENT_SIG
    )
    const tokenId = withdrawEvent.data
    logger.debug({ burnTxHash, burnReceipt, withdrawEvent, tokenId })
    const contract = new this.web3Client.web3.eth.Contract(this.network.abi('ChildERC721Mintable'), burnReceipt.to)
    const mintEvents = await contract.getPastEvents('Transfer', {
      filter: { tokenId },
      fromBlock: 0,
      toBlock: 'latest',
    })
    logger.debug({ mintEvents })
    if (!mintEvents || !mintEvents.length) {
      throw new Error('Could not retrieve the mint event')
    }
    const mintTxHash = mintEvents.find(event => event.raw.topics[3] === tokenId).transactionHash
    let mint: any = await this.web3Client.web3.eth.getTransaction(mintTxHash)
    mint = ethUtils.bufferToHex(await Proofs.getTxBytes(mint))
    return { payload, mint }
  }
}
