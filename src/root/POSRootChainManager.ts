import BN from 'bn.js'
import Contract from 'web3/eth/contract'
import ethers from 'ethers'

import RootChainManagerArtifact from 'matic-pos-portal/artifacts/RootChainManager.json'

import ContractsBase from '../common/ContractsBase'
import { address, SendOptions, MaticClientInitializationOptions } from '../types/Common'
import Web3Client from '../common/Web3Client'
import RootChain from './RootChain'
import ExitManager from '../common/ExitManager'

const ERC20_TRANSFER_EVENT_SIG = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'

const abiCoder: ethers.utils.AbiCoder = ethers.utils.defaultAbiCoder

export default class POSRootChainManager extends ContractsBase {
  public posRootChainManager: Contract
  private exitManager: ExitManager
  private erc20Predicate: address | null
  private erc721Predicate: address | null
  private erc1155Predicate: address | null

  private formatUint256 = this.encode

  constructor(options: MaticClientInitializationOptions, rootChain: RootChain, web3Client: Web3Client) {
    super(web3Client, options.network)
    this.posRootChainManager = new this.web3Client.parentWeb3.eth.Contract(
      RootChainManagerArtifact.abi,
      options.posRootChainManager
    )
    this.exitManager = new ExitManager(rootChain, options, web3Client)
    this.erc20Predicate = options.posERC20Predicate
    this.erc721Predicate = options.posERC721Predicate
    this.erc1155Predicate = options.posERC1155Predicate
  }

  async depositEtherForUser(amount: BN | string, user: address, options: SendOptions = {}) {
    const txObject = this.posRootChainManager.methods.depositEtherFor(user)
    const _options = await this.web3Client.fillOptions(
      txObject,
      true /* onRootChain */,
      Object.assign(options, { value: this.formatUint256(amount) })
    )
    if (_options.encodeAbi) {
      return Object.assign(_options, { data: txObject.encodeABI(), to: this.posRootChainManager.options.address })
    }
    return this.web3Client.send(txObject, _options)
  }

  async approveERC20(rootToken: address, amount: BN | string, options?: SendOptions) {
    if (!this.erc20Predicate) {
      throw new Error('Set posERC20Predicate while constructing client')
    }
    const txObject = this.getPOSERC20TokenContract(rootToken, true).methods.approve(
      this.erc20Predicate,
      this.formatUint256(amount)
    )
    const _options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (_options.encodeAbi) {
      return Object.assign(_options, { data: txObject.encodeABI(), to: rootToken })
    }
    return this.web3Client.send(txObject, _options)
  }

  async depositERC20ForUser(rootToken: address, amount: BN | string, user: address, options?: SendOptions) {
    const depositData = abiCoder.encode(['uint256'], [this.formatUint256(amount)])
    const txObject = this.posRootChainManager.methods.depositFor(user, rootToken, depositData)
    const _options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (_options.encodeAbi) {
      return Object.assign(_options, { data: txObject.encodeABI(), to: this.posRootChainManager.options.address })
    }
    return this.web3Client.send(txObject, _options)
  }

  async burnERC20(childToken: address, amount: BN | string, options?: SendOptions) {
    const childTokenContract = this.getPOSERC20TokenContract(childToken)
    const txObject = childTokenContract.methods.withdraw(this.formatUint256(amount))
    const _options = await this.web3Client.fillOptions(txObject, false /* onRootChain */, options)
    if (_options.encodeAbi) {
      return Object.assign(_options, { data: txObject.encodeABI(), to: childToken })
    }
    return this.web3Client.send(txObject, _options)
  }

  async exitERC20(burnTxHash, options?) {
    const payload = await this.exitManager.buildPayloadForExit(burnTxHash, ERC20_TRANSFER_EVENT_SIG)
    const txObject = this.posRootChainManager.methods.exit(payload)
    const _options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (_options.encodeAbi) {
      return Object.assign(_options, { data: txObject.encodeABI(), to: this.posRootChainManager.options.address })
    }
    return this.web3Client.send(txObject, _options)
  }
}
