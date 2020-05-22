import BN from 'bn.js'
import Contract from 'web3/eth/contract'

import RootChainManagerArtifact from 'matic-pos-portal/artifacts/RootChainManager.json'
import ChildTokenArtifact from 'matic-pos-portal/artifacts/ChildToken.json'

import ContractsBase from '../common/ContractsBase'
import { address, SendOptions } from '../types/Common'
import Web3Client from '../common/Web3Client'
import RootChain from './RootChain'
import ExitManager from '../common/ExitManager'

const TRANSFER_EVENT_SIG = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'

export default class POSRootChainManager extends ContractsBase {
  public posRootChainManager: Contract
  private exitManager: ExitManager

  constructor(posRootChainManager: address, rootChain: RootChain, web3Client: Web3Client) {
    super(web3Client)
    this.posRootChainManager = new this.web3Client.parentWeb3.eth.Contract(
      RootChainManagerArtifact.abi,
      posRootChainManager
    )
    this.exitManager = new ExitManager(rootChain, web3Client)
  }

  async approveERC20(rootToken: address, amount: BN | string, options?: SendOptions) {
    const txObject = this.getERC20TokenContract(rootToken, true).methods.approve(
      this.posRootChainManager.options.address,
      this.encode(amount)
    )
    const _options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (_options.encodeAbi) {
      return Object.assign(_options, { data: txObject.encodeABI(), to: rootToken })
    }
    return this.web3Client.send(txObject, _options)
  }

  async depositERC20ForUser(rootToken: address, amount: BN | string, user: address, options?: SendOptions) {
    const txObject = this.posRootChainManager.methods.depositFor(user, rootToken, this.encode(amount))
    const _options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (_options.encodeAbi) {
      return Object.assign(_options, { data: txObject.encodeABI(), to: this.posRootChainManager.options.address })
    }
    return this.web3Client.send(txObject, _options)
  }

  async depositEtherForUser(amount: BN | string, user: address, options: SendOptions = {}) {
    const txObject = this.posRootChainManager.methods.depositEtherFor(user)
    const _options = await this.web3Client.fillOptions(
      txObject,
      true /* onRootChain */,
      Object.assign(options, { value: this.encode(amount) })
    )
    if (_options.encodeAbi) {
      return Object.assign(_options, { data: txObject.encodeABI(), to: this.posRootChainManager.options.address })
    }
    return this.web3Client.send(txObject, _options)
  }

  async burnERC20(childToken: address, amount: BN | string, options?: SendOptions) {
    const childTokenContract = new this.web3Client.web3.eth.Contract(ChildTokenArtifact.abi, childToken)
    const txObject = childTokenContract.methods.withdraw(this.encode(amount))
    const _options = await this.web3Client.fillOptions(txObject, false /* onRootChain */, options)
    if (_options.encodeAbi) {
      return Object.assign(_options, { data: txObject.encodeABI(), to: childToken })
    }
    return this.web3Client.send(txObject, _options)
  }

  async exitERC20(burnTxHash, options?) {
    const payload = await this.exitManager.buildPayloadForExit(burnTxHash, TRANSFER_EVENT_SIG)
    const txObject = this.posRootChainManager.methods.exit(payload)
    const _options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (_options.encodeAbi) {
      return Object.assign(_options, { data: txObject.encodeABI(), to: this.posRootChainManager.options.address })
    }
    return this.web3Client.send(txObject, _options)
  }
}
