import Web3 from 'web3'
import DepositManager from './root/DepositManager'

export default class Matic {
  _web3: any
  _parentWeb3: any
  public depositManager: DepositManager

  constructor(options: any = {}) {
    // this._throwIfNull(options.maticProvider, 'maticProvider is required')
    // this._throwIfNull(options.parentProvider, 'parentProvider is required')

    this._web3 = new Web3(options.maticProvider)
    this._web3.matic = true
    this._parentWeb3 = new Web3(options.parentProvider)

    this.depositManager = new DepositManager(options.depositManagerAddress, this._parentWeb3)
  }
}
