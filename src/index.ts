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
  public childChainAddress: address
  public childMaticAddress: address

  constructor(options: any = {}) {
    const web3Client = new Web3Client(
      options.parentProvider,
      options.maticProvider,
      options.parentDefaultOptions || {},
      options.maticDefaultOptions || {}
    )
    super(web3Client)
    this.web3Client = web3Client
    this.registry = new Registry(options.registry, this.web3Client)
    this.rootChain = new RootChain(options.rootChain, this.web3Client)
    this.depositManager = new DepositManager(options.depositManager, this.web3Client)
    this.withdrawManager = new WithdrawManager(options.withdrawManager, this.rootChain, this.web3Client, this.registry)
    this.childChainAddress = options.childChain
    this.childMaticAddress = '0000000000000000000000000000000000001010'
  }

  initialize() {
    return Promise.all([this.withdrawManager.initialize()])
  }

  setWallet(_wallet) {
    this.web3Client.wallet = _wallet
  }

  async balanceOfERC20(userAddress: address, token: address, options?: SendOptions) {
    if (options && (!token || !userAddress)) {
      throw new Error('token address or user address is missing')
    }

    const balance = this.getERC20TokenContract(token, options.parent)
      .methods.balanceOf(userAddress)
      .call()
    return balance
  }

  async balanceOfERC721(userAddress: address, token: address, options?: SendOptions) {
    if (options && (!token || !userAddress)) {
      throw new Error('token address or user address is missing')
    }

    const balance = this.getERC721TokenContract(token, options.parent)
      .methods.balanceOf(userAddress)
      .call()
    return balance
  }

  async tokenOfOwnerByIndexERC721(userAddress: address, token: address, index: number, options?: SendOptions) {
    if (options && (!token || !userAddress)) {
      throw new Error('token address or user address is missing')
    }

    const tokenID = this.getERC721TokenContract(token, options.parent)
      .methods.tokenOfOwnerByIndex(userAddress, index)
      .call()
    return tokenID
  }

  async transferERC20Tokens(token: address, to: address, amount: BN | string, options?: SendOptions) {
    if (options && (!options.from || !amount || !token || !to)) {
      throw new Error('options.from, to, token or amount is missing')
    }

    const txObject = this.getERC20TokenContract(token, options.parent).methods.transfer(to, this.encode(amount))

    const _options = await this._fillOptions(
      options,
      txObject,
      options.parent ? this.web3Client.getParentWeb3() : this.web3Client.getMaticWeb3()
    )

    if (options.encodeAbi) {
      _options.data = txObject.encodeABI()
      _options.to = token
      return _options
    }

    return this.web3Client.send(txObject, _options)
  }

  async transferERC721Tokens(token: address, to: address, tokenId: string, options?: SendOptions) {
    if (options && (!options.from || !tokenId || !token || !to)) {
      throw new Error('options.from, to, token or tokenId is missing')
    }

    const txObject = this.getERC721TokenContract(token, options.parent).methods.transferFrom(options.from, to, tokenId)

    const _options = await this._fillOptions(
      options,
      txObject,
      options.parent ? this.web3Client.getParentWeb3() : this.web3Client.getMaticWeb3()
    )

    if (options.encodeAbi) {
      _options.data = txObject.encodeABI()
      _options.to = token
      return _options
    }

    return this.web3Client.send(txObject, _options)
  }

  async transferMatic(toAddress: address, amount: BN | string, options?: SendOptions) {
    if (options && (!options.from || !amount || !toAddress)) {
      throw new Error('Missing Parameters')
    }
    const txObject = this.getChildMaticContract(this.childMaticAddress).methods.transfer(toAddress, amount)
    const _options = await this._fillOptions(options, txObject, this.web3Client.getMaticWeb3())
    _options.value = amount
    _options.to = this.childMaticAddress
    if (options.encodeAbi) {
      _options.data = txObject.encodeABI()
      return _options
    }
    console.log('_options', _options) // eslint-disable-line
    return this.web3Client.send(txObject, _options)
  }

  async transferEthers(toAddress: address, amount: BN | string, options?: SendOptions) {
    if (options && (!options.from || !amount || !toAddress)) {
      throw new Error('Missing Parameters')
    }
    const from = options.from
    const value = this.encode(amount)
    if (!options.parent) {
      console.log('--->', toAddress, amount, options) // eslint-disable-line
      return this.transferMatic(toAddress, value, options)
    }
    const web3Object = this.web3Client.getParentWeb3()
    const gasLimit = await web3Object.eth.estimateGas({
      from,
      value,
    })
    options.gas = gasLimit
    options.value = value
    options.to = toAddress
    const _options = await this._fillOptions(options, {}, web3Object)
    if (options.encodeAbi) {
      return _options
    }
    console.log('I am here', web3Object, _options) // eslint-disable-line
    return this.web3Client.wrapWeb3Promise(web3Object.eth.sendTransaction(_options), _options)
  }

  depositEther(amount: BN | string, options?: SendOptions) {
    if (options && (!options.from || !amount)) {
      throw new Error('options.from or amount is missing')
    }
    return this.depositManager.depositEther(amount, options)
  }

  async depositDataByHash(txHash: string) {
    const depositReceipt = await this.web3Client.parentWeb3.eth.getTransactionReceipt(txHash)
    if (!depositReceipt) {
      return 'Transaction hash is not Found'
    }
    const newDepositEvent = depositReceipt.logs.find(
      l => l.topics[0].toLowerCase() === DepositManager.NEW_DEPOSIT_EVENT_SIG
    )

    const data = newDepositEvent.data
    const depositId = parseInt(data.substring(data.length - 64), 16)
    const depositExists = await this.depositManager.depositDataByID(depositId, this.childChainAddress)
    if (!depositExists) {
      return 'Deposit is not processed on Matic chain'
    }
    return depositReceipt
  }

  approveERC20TokensForDeposit(token: address, amount: BN | string, options?: SendOptions) {
    if (options && (!options.from || !amount || !token)) {
      throw new Error('options.from, token or amount is missing')
    }

    return this.depositManager.approveERC20(token, amount, options)
  }

  depositERC20ForUser(token: address, user: address, amount: BN | string, options?: SendOptions) {
    if (options && (!options.from || !amount || !token)) {
      throw new Error('options.from, token or amount is missing')
    }
    return this.depositManager.depositERC20ForUser(token, amount, user, options)
  }

  async safeDepositERC721Tokens(token: address, tokenId: BN, options?: SendOptions) {
    if (options && (!options.from || !tokenId || !token)) {
      throw new Error('options.from, token or tokenId is missing')
    }
    const txObject = this.getERC721TokenContract(token, true).methods.safeTransferFrom(
      options.from,
      this.depositManager.getAddress(),
      tokenId
    )

    const _options = await this._fillOptions(options, txObject, this.web3Client.getParentWeb3())

    if (options.encodeAbi) {
      _options.data = txObject.encodeABI()
      _options.to = token
      return _options
    }

    return this.web3Client.send(txObject, _options)
  }

  startWithdraw(token: address, amount: BN | string, options?: SendOptions) {
    this._validateInputs(token, amount, options)
    return this.withdrawManager.burnERC20Tokens(token, amount, options)
  }

  startWithdrawForNFT(token: address, tokenId: BN | string, options?: SendOptions) {
    this._validateInputs(token, tokenId, options)
    return this.withdrawManager.burnERC721Token(token, tokenId, options)
  }

  withdraw(txHash: string, options?: SendOptions) {
    if (!txHash) {
      throw new Error(`txHash not provided`)
    }
    if (options && !options.from) {
      throw new Error(`options.from is missing`)
    }
    return this.withdrawManager.startExitWithBurntERC20Tokens(txHash, options)
  }

  withdrawNFT(txHash: string, options?: SendOptions) {
    if (!txHash) {
      throw new Error(`txHash not provided`)
    }
    if (options && !options.from) {
      throw new Error(`options.from is missing`)
    }
    return this.withdrawManager.startExitWithBurntERC721Tokens(txHash, options)
  }

  processExits(tokenAddress: string, options?: SendOptions) {
    return this.withdrawManager.processExits(tokenAddress, options)
  }

  private _validateInputs(token: address, amountOrTokenId: BN | string, options?: SendOptions) {
    if (!this.web3Client.web3.utils.isAddress(this.web3Client.web3.utils.toChecksumAddress(token))) {
      throw new Error(`${token} is not a valid token address`)
    }
    if (!amountOrTokenId) {
      // ${amountOrTokenId} will stringify it while printing which might be a problem
      throw new Error(`${amountOrTokenId} is not a amountOrTokenId`)
    }
    if (options && !options.from) {
      throw new Error(`options.from is missing`)
    }
  }
}
