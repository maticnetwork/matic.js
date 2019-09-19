import Web3 from 'web3'
import DepositManager from './root/DepositManager'
import { address, SendOptions } from './types/Common'

export default class Matic {
  _web3: any
  _parentWeb3: any
  public depositManager: DepositManager

  constructor(options: any = {}, _defaultOptions?: SendOptions) {
    this._web3 = new Web3(options.maticProvider)
    this._web3.matic = true
    this._parentWeb3 = new Web3(options.parentProvider)

    this.depositManager = new DepositManager(options.depositManagerAddress, this._parentWeb3, _defaultOptions)
  }
}
