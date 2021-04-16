import BN from 'bn.js'
import { Contract } from 'web3-eth-contract'
import ContractsBase from '../common/ContractsBase'
import { mapPromise } from '../common/MapPromise'
import Web3Client from '../common/Web3Client'
import { address, MaticClientInitializationOptions, SendOptions } from '../types/Common'
import Registry from './Registry'

export default class DepositManager extends ContractsBase {
  static NEW_DEPOSIT_EVENT_SIG = '0x1dadc8d0683c6f9824e885935c1bec6f76816730dcec148dda8cf25a7b9f797b'

  public depositManagerContract: Contract
  public childChainContract: Contract

  private registry: Registry

  constructor(options: MaticClientInitializationOptions, web3Client: Web3Client, registry: Registry) {
    super(web3Client, options.network)
    this.depositManagerContract = new this.web3Client.parentWeb3.eth.Contract(
      options.network.abi('DepositManager'),
      options.depositManager
    )
    this.registry = registry
  }

  async initialize() {
    const childChainAddress = (await this.registry.registry.methods.getChildChainAndStateSender().call())[0]
    this.childChainContract = new this.web3Client.web3.eth.Contract(this.network.abi('ChildChain'), childChainAddress)
  }

  async depositStatusFromTxHash(txHash: string) {
    const deposits = []
    const depositReceipt = await this.web3Client.parentWeb3.eth.getTransactionReceipt(txHash)
    if (!depositReceipt) {
      throw new Error('Transaction hash not found')
    }
    const depositEvents = depositReceipt.logs.filter(
      l => l.topics[0].toLowerCase() === DepositManager.NEW_DEPOSIT_EVENT_SIG
    )
    if (depositEvents.length > 0) {
      await mapPromise(depositEvents, async event => {
        const data = event.data
        const depositId = '0x' + data.substring(data.length - 64)
        deposits.push({
          depositId,
          isProcessed: await this.isDepositProcessed(depositId),
        })
      })
    }
    return { receipt: depositReceipt, deposits }
  }

  isDepositProcessed(depositId) {
    return this.childChainContract.methods.deposits(depositId).call()
  }

  async approveERC20(token: address, amount: BN | string, options?: SendOptions) {
    const txObject = this.getERC20TokenContract(token, true).methods.approve(
      this.depositManagerContract.options.address,
      this.encode(amount)
    )
    const web3Options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: token })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async approveMaxERC20(token: address, options?: SendOptions) {
    const txObject = this.getERC20TokenContract(token, true).methods.approve(
      this.depositManagerContract.options.address,
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    )
    const web3Options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: token })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async allowanceOfERC20(userAddress: address, token: address, options?: SendOptions) {
    if (options && (!token || !userAddress)) {
      throw new Error('token address or user address is missing')
    }
    const allowance = await this.getERC20TokenContract(token, true)
      .methods.allowance(userAddress, this.depositManagerContract.options.address)
      .call()

    return allowance
  }

  async depositERC20(token: address, amount: BN | string, options?: SendOptions) {
    const txObject = this.depositManagerContract.methods.depositERC20(token, this.encode(amount))
    const web3Options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: this.depositManagerContract.options.address })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  depositERC721(token: address, tokenId: string, options?: SendOptions) {
    return this.web3Client.send(this.depositManagerContract.methods.depositERC721(token, tokenId), options)
  }

  depositBulk(tokens: address[], amountOrTokenIds: string[], user: address, options?: SendOptions) {
    return this.web3Client.send(
      this.depositManagerContract.methods.depositBulk(tokens, amountOrTokenIds, user),
      options
    )
  }

  async depositERC20ForUser(token: address, amount: BN | string, user: address, options?: SendOptions) {
    const txObject = this.depositManagerContract.methods.depositERC20ForUser(token, user, this.encode(amount))
    const web3Options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: this.depositManagerContract.options.address })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  depositERC721ForUser(token: address, tokenId: string, user: address, options?: SendOptions) {
    return this.web3Client.send(this.depositManagerContract.methods.depositERC721ForUser(token, user, tokenId), options)
  }

  async depositEther(amount: BN | string, options: SendOptions = {}) {
    const txObject = this.depositManagerContract.methods.depositEther()
    const web3Options = await this.web3Client.fillOptions(
      txObject,
      true /* onRootChain */,
      Object.assign(options, { value: this.encode(amount) })
    )
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: this.depositManagerContract.options.address })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  getAddress() {
    return this.depositManagerContract.options.address
  }
}
