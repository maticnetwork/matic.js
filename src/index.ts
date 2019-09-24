import DepositManager from './root/DepositManager'
import RootChain from './root/RootChain'
import Registry from './root/Registry'
import WithdrawManager from './root/WithdrawManager'
import Web3Client from './common/Web3Client'

export default class Matic {
  public web3Client: Web3Client
  public depositManager: DepositManager
  public rootChain: RootChain
  public withdrawManager: WithdrawManager
  public registry: Registry

  constructor(options: any = {}) {
    this.web3Client = new Web3Client(options.parentProvider, options.maticProvider, options.parentDefaultOptions || {}, options.maticDefaultOptions || {})
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
}

// export default async function initialize(options) {
//   const matic = new Matic(options)
//   return matic.initialize()
// }
