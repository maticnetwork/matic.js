import DepositManager from './root/DepositManager'
import RootChain from './root/RootChain'
import WithdrawManager from './root/WithdrawManager'
import Web3Client from './common/Web3Client'

export default class Matic {
  public web3Client: Web3Client
  public depositManager: DepositManager
  public rootChain: RootChain
  public withdrawManager: WithdrawManager

  constructor(options: any = {}) {
    this.web3Client = new Web3Client(options.parentProvider, options.maticProvider, options.parentDefaultOptions, options.maticDefaultOptions)
    this.rootChain = new RootChain(options.rootChain, this.web3Client)
    this.depositManager = new DepositManager(options.depositManagerAddress, this.web3Client)
    this.withdrawManager = new WithdrawManager(options.withdrawManager, this.rootChain, this.web3Client)
  }
}
