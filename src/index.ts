import Web3 from 'web3'
import DepositManager from './root/DepositManager'
import { SendOptions } from './types/Common'

export default class Matic {
  _web3: any
  public parentWeb3: any
  public depositManager: DepositManager

  constructor(options: any = {}, _defaultOptions?: SendOptions) {
    this._web3 = new Web3(options.maticProvider)
    this._web3.matic = true
    this.parentWeb3 = new Web3(options.parentProvider)

    if (options.depositManagerAddress) {
      this.depositManager = new DepositManager(options.depositManagerAddress, this.parentWeb3, _defaultOptions)
    }
  }
}
