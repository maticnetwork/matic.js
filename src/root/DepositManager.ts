import BN from 'bn.js'
import Contract from 'web3/eth/contract'
import DepositManagerArtifact from 'matic-protocol/contracts-core/artifacts/DepositManager.json'

import ContractsBase from '../common/ContractsBase'
import { address, SendOptions } from '../types/Common'
import Web3Client from '../common/Web3Client'

export default class DepositManager extends ContractsBase {
  public depositManagerContract: Contract

  constructor(depositManager: address, web3Client: Web3Client) {
    super(web3Client)
    this.depositManagerContract = new this.web3Client.parentWeb3.eth.Contract(
      DepositManagerArtifact.abi,
      depositManager,
    )
  }

  async approveERC20(
    token: address,
    amount: BN | string,
    options?: SendOptions,
  ) {
    const txObject = this.getERC20TokenContract(token, true).methods.approve(
      this.depositManagerContract.options.address,
      this.encode(amount),
    )

    const _options = await this._fillOptions(
      options,
      txObject,
      this.web3Client.getParentWeb3(),
    )

    if (options.encodeAbi) {
      _options.data = txObject.encodeABI()
      _options.to = token
      return _options
    }

    return this.web3Client.send(txObject, _options)
  }

  async depositERC20(
    token: address,
    amount: BN | string,
    options?: SendOptions,
  ) {
    const txObject = this.depositManagerContract.methods.depositERC20(
      token,
      this.encode(amount),
    )

    const _options = await this._fillOptions(
      options,
      txObject,
      this.web3Client.getParentWeb3(),
    )

    if (options.encodeAbi) {
      _options.data = txObject.encodeABI()
      _options.to = this.depositManagerContract.options.address
      return _options
    }

    return this.web3Client.send(txObject, _options)
  }

  depositERC721(token: address, tokenId: string, options?: SendOptions) {
    return this.web3Client.send(
      this.depositManagerContract.methods.depositERC721(token, tokenId),
      options,
    )
  }

  depositBulk(
    tokens: address[],
    amountOrTokenIds: string[],
    user: address,
    options?: SendOptions,
  ) {
    return this.web3Client.send(
      this.depositManagerContract.methods.depositBulk(
        tokens,
        amountOrTokenIds,
        user,
      ),
      options,
    )
  }

  async depositERC20ForUser(
    token: address,
    amount: BN | string,
    user: address,
    options?: SendOptions,
  ) {
    const txObject = this.depositManagerContract.methods.depositERC20ForUser(
      token,
      user,
      this.encode(amount),
    )
    const _options = await this._fillOptions(
      options,
      txObject,
      this.web3Client.getParentWeb3(),
    )

    if (options.encodeAbi) {
      _options.data = txObject.encodeABI()
      _options.to = this.depositManagerContract.options.address
      return _options
    }

    return this.web3Client.send(txObject, _options)
  }

  depositERC721ForUser(
    token: address,
    tokenId: string,
    user: address,
    options?: SendOptions,
  ) {
    return this.web3Client.send(
      this.depositManagerContract.methods.depositERC721ForUser(
        token,
        user,
        tokenId,
      ),
      options,
    )
  }

  depositEther(amount: string, options: SendOptions = {}) {
    return this.web3Client.send(
      this.depositManagerContract.methods.depositEther(),
      Object.assign(options, { value: amount }),
    )
  }

  getAddress() {
    return this.depositManagerContract.options.address
  }
}
