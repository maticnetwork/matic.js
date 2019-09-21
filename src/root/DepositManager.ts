import Web3 from 'web3'
import Contract from 'web3/eth/contract'
import { address, SendOptions } from '../types/Common'
import DepositManagerArtifact from '../artifacts/DepositManager.json'
import BN from 'bn.js'
import assert from 'assert';

export default class DepositManager {
  public depositManagerContract: Contract
  private _defaultOptions: SendOptions

  constructor(depositManagerContractAddress: address, _parentWeb3: Web3, _defaultOptions?: SendOptions) {
    this.depositManagerContract = new _parentWeb3.eth.Contract(DepositManagerArtifact.abi, depositManagerContractAddress)
    this._defaultOptions = _defaultOptions || {}
  }

  depositERC20(token: address, amount: BN | string, options?: SendOptions) {
    return this._send(
      this.depositManagerContract.methods.depositERC20(token, this.encode(amount)),
      options
    )
  }

  depositERC721(token: address, tokenId: string, options?: SendOptions) {
    return this._send(
      this.depositManagerContract.methods.depositERC721(token, tokenId),
      options
    )
  }

  depositBulk(tokens: address[], amountOrTokenIds: string[], user: address, options?: SendOptions) {
    return this._send(
      this.depositManagerContract.methods.depositBulk(tokens, amountOrTokenIds, user),
      options
    )
  }

  depositERC20ForUser(token: address, amount: string, user: address, options?: SendOptions) {
    return this._send(
      this.depositManagerContract.methods.depositERC20ForUser(token, user, amount),
      options
    )
  }

  depositERC721ForUser(token: address, tokenId: string, user: address, options?: SendOptions) {
    return this._send(
      this.depositManagerContract.methods.depositERC721ForUser(token, user, tokenId),
      options
    )
  }

  depositEther(amount: string, options: SendOptions = {}) {
    return this._send(
      this.depositManagerContract.methods.depositEther(),
      Object.assign(options, { value: amount })
    )
  }

  getAddress() {
    return this.depositManagerContract.options.address
  }

  setDefaultOptions(_defaultOptions: SendOptions) {
    this._defaultOptions = _defaultOptions
  }

  private encode(number: BN | string) {
    if (BN.isBN(number)) {
      return '0x' + number.toString(16)
    } else if (typeof number === 'string') {
      assert.equal(number.slice(0, 2), '0x', 'expected a 0x prefixed string')
      return number
    }
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
