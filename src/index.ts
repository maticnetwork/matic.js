import BN from 'bn.js'

import DepositManager from './root/DepositManager'
import RootChain from './root/RootChain'
import Registry from './root/Registry'
import WithdrawManager from './root/WithdrawManager'
import Web3Client from './common/Web3Client'
import { address, SendOptions } from './types/Common'
import ContractsBase from './common/ContractsBase'

export default class Matic extends ContractsBase {
  public web3Client: Web3Client
  public depositManager: DepositManager
  public rootChain: RootChain
  public withdrawManager: WithdrawManager
  public registry: Registry

  constructor(options: any = {}) {
    const web3Client = new Web3Client(options.parentProvider, options.maticProvider, options.parentDefaultOptions || {}, options.maticDefaultOptions || {})
    super(web3Client)
    this.web3Client = web3Client
    this.registry = new Registry(options.registry, this.web3Client)
    this.rootChain = new RootChain(options.rootChain, this.web3Client)
    this.depositManager = new DepositManager(options.depositManager, this.web3Client)
    this.withdrawManager = new WithdrawManager(options.withdrawManager, this.rootChain, this.web3Client, this.registry)
  }

  initialize() {
    return Promise.all([
      this.withdrawManager.initialize()
    ])
  }

  transferTokens(token: address, to: address, amount: BN | string, options?: SendOptions) {
    return this.web3Client.sendOnMatic(
      this.getERC20TokenContract(token).transfer(to, this.encode(amount)),
      options
    )
  }
}
