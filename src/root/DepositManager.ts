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

  setDepositManagerAddress(_depositManagerContractAddress: address) {
    this._depositManagerContract.options.address = _depositManagerContractAddress
  }

  depositERC20(token: address, amount: string, options?: SendOptions) {
    return this._send(
      this._depositManagerContract.methods.depositERC20(token, amount),
      options
    )
  }

  depositERC721(token: address, tokenId: string, options?: SendOptions) {
    return this._send(
      this._depositManagerContract.methods.depositERC721(token, tokenId),
      options
    )
  }

  depositBulk(tokens: address[], amountOrTokenIds: string[], user: address, options?: SendOptions) {
    return this._send(
      this._depositManagerContract.methods.depositBulk(tokens, amountOrTokenIds, user),
      options
    )
  }

  depositERC20ForUser(token: address, amount: string, user: address, options?: SendOptions) {
    return this._send(
      this._depositManagerContract.methods.depositERC20ForUser(token, user, amount),
      options
    )
  }

  depositERC721ForUser(token: address, tokenId: string, user: address, options?: SendOptions) {
    return this._send(
      this._depositManagerContract.methods.depositERC721ForUser(token, user, tokenId),
      options
    )
  }

  depositEther(amount: string, options: SendOptions = {}) {
    return this._send(
      this._depositManagerContract.methods.depositEther(),
      Object.assign(options, { value: amount })
    )
  }

  private async _send(method, options) {
    const _options = options || this._defaultOptions
    // since we use the delegated proxy patterns, the following should be a good way to provide enough gas
    // apparently even when provided with a buffer of 20k, the call reverts. This shouldn't be happening because the actual gas used is less than what the estimation returns
    // providing higher buffer for now
    _options.gas = (await method.estimateGas()) + 200000
    return method.send(_options)
  }
}
