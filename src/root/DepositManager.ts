import Web3 from 'web3'
import { Contract } from 'web3/types'
import { address, BigNumber, SendOptions } from '../types/Common'
import DepositManagerArtifact from '../artifacts/DepositManager.json'

export default class DepositManager {
  private _depositManagerContract: Contract
  private _defaultOptions: SendOptions

  constructor(_depositManagerContractAddress: address, _web3: Web3, _defaultOptions?: SendOptions) {
    this._depositManagerContract = new _web3.eth.Contract(DepositManagerArtifact.abi, _depositManagerContractAddress)
    this._defaultOptions = _defaultOptions || {}
  }

  depositERC20(token: address, amount: BigNumber, options?: SendOptions) {
    return this._depositManagerContract.methods.depositERC20(token, amount)
      .send(options || this._defaultOptions)
  }
}
