import BN from 'bn.js'

import DepositManager from './root/DepositManager'
import RootChain from './root/RootChain'
import Registry from './root/Registry'
import WithdrawManager from './root/WithdrawManager'
import POSRootChainManager from './root/POSRootChainManager'
import { address, SendOptions, order, MaticClientInitializationOptions } from './types/Common'
import SDKClient from './common/SDKClient'
import { Utils } from './common/Utils'

export class MaticPOSClient extends SDKClient {
  private rootChain: RootChain
  private posRootChainManager: POSRootChainManager

  constructor(options: any = {}) {
    options.network = SDKClient.initializeNetwork(options.network, options.version)
    if (!options.rootChain) {
      options.rootChain = options.network.Main.Contracts.RootChainProxy
    }
    super(options)
    this.rootChain = new RootChain(options, this.web3Client)
    this.posRootChainManager = new POSRootChainManager(options.posRootChainManager, this.rootChain, this.web3Client)
  }

  approveERC20ForDeposit(rootToken: address, amount: BN | string, options?: SendOptions) {
    if (options && (!options.from || !amount || !rootToken)) {
      throw new Error('options.from, rootToken or amount is missing')
    }
    return this.posRootChainManager.approveERC20(rootToken, amount, options)
  }

  depositERC20ForUser(rootToken: address, user: address, amount: BN | string, options?: SendOptions) {
    if (options && (!options.from || !amount || !rootToken || !user)) {
      throw new Error('options.from, rootToken, user, or amount is missing')
    }
    return this.posRootChainManager.depositERC20ForUser(rootToken, amount, user, options)
  }

  depositEtherForUser(user: address, amount: BN | string, options?: SendOptions) {
    if (options && (!options.from || !amount || !user)) {
      throw new Error('options.from, user or amount is missing')
    }
    return this.posRootChainManager.depositEtherForUser(amount, user, options)
  }

  burnERC20(childToken: address, amount: BN | string, options?: SendOptions) {
    if (!this.web3Client.web3.utils.isAddress(this.web3Client.web3.utils.toChecksumAddress(childToken))) {
      throw new Error(`${childToken} is not a valid token address`)
    }
    if (!amount) {
      // ${amount} will stringify it while printing which might be a problem
      throw new Error(`${amount} is not a amount`)
    }
    if (options && !options.from) {
      throw new Error(`options.from is missing`)
    }
    return this.posRootChainManager.burnERC20(childToken, amount, options)
  }

  exitERC20(txHash: string, options?: SendOptions) {
    if (!txHash) {
      throw new Error(`txHash not provided`)
    }
    if (options && !options.from) {
      throw new Error(`options.from is missing`)
    }
    return this.posRootChainManager.exitERC20(txHash, options)
  }
}

export default class Matic extends SDKClient {
  public depositManager: DepositManager
  public rootChain: RootChain
  public withdrawManager: WithdrawManager
  public registry: Registry
  public utils: Utils
  public static MaticPOSClient = MaticPOSClient // workaround for web compatibility

  constructor(options: MaticClientInitializationOptions = {}) {
    const network = SDKClient.initializeNetwork(options.network, options.version)
    // override contract addresses if they were provided during initialization
    options = Object.assign(
      {
        registry: network.Main.Contracts.Registry,
        rootChain: network.Main.Contracts.RootChainProxy,
        depositManager: network.Main.Contracts.DepositManagerProxy,
        withdrawManager: network.Main.Contracts.WithdrawManagerProxy,
      },
      options
    )
    options.network = network
    super(options)
    this.registry = new Registry(options, this.web3Client)
    this.rootChain = new RootChain(options, this.web3Client)
    this.depositManager = new DepositManager(options, this.web3Client, this.registry)
    this.withdrawManager = new WithdrawManager(options, this.rootChain, this.web3Client, this.registry)
    this.utils = new Utils()
  }

  initialize() {
    return Promise.all([this.withdrawManager.initialize(), this.depositManager.initialize()])
  }

  async transferEther(to: address, amount: BN | string, options?: SendOptions) {
    if (options && (!options.from || !amount || !to)) {
      throw new Error('Missing Parameters')
    }
    const from = options.from
    const value = this.encode(amount)
    if (!options.parent) {
      const maticWeth = await this.registry.registry.methods.getWethTokenAddress().call()
      return this.transferERC20Tokens(maticWeth, to, value, options)
    }
    const web3Object = this.web3Client.getParentWeb3()
    if (!options.gas) {
      options.gas = await web3Object.eth.estimateGas({
        from,
        value,
      })
    }
    Object.assign(options, { value, to })
    const _options = await this.web3Client.fillOptions(options /* txObject */, true /* onRootChain */, options)
    return _options.encodeAbi
      ? _options
      : this.web3Client.wrapWeb3Promise(web3Object.eth.sendTransaction(_options), _options)
  }

  depositEther(amount: BN | string, options?: SendOptions) {
    if (options && (!options.from || !amount)) {
      throw new Error('options.from or amount is missing')
    }
    return this.depositManager.depositEther(amount, options)
  }

  depositStatusFromTxHash(txHash: string): Promise<{ receipt: any; deposits: any[] }> {
    if (!txHash) {
      throw new Error('txHash is missing')
    }
    return this.depositManager.depositStatusFromTxHash(txHash)
  }

  approveERC20TokensForDeposit(token: address, amount: BN | string, options?: SendOptions) {
    if (options && (!options.from || !amount || !token)) {
      throw new Error('options.from, token or amount is missing')
    }

    return this.depositManager.approveERC20(token, amount, options)
  }

  async getTransferSignature(sellOrder: order, buyOrder: order, options: SendOptions) {
    if (!sellOrder.orderId || !sellOrder.spender) {
      throw new Error('orderId or spender missing from sell order')
    }
    if (!options.from) {
      throw new Error('options.from is missing')
    }

    const orderObj = {
      token: buyOrder.token,
      amount: buyOrder.amount,
      id: sellOrder.orderId,
      expiration: sellOrder.expiry,
    }
    const orderHash = this.utils.getOrderHash(orderObj)
    let chainId = await this.web3Client.web3.eth.net.getId()
    const dataToSign = {
      token: sellOrder.token,
      tokenIdOrAmount: sellOrder.amount,
      spender: sellOrder.spender,
      data: orderHash,
      expiration: sellOrder.expiry,
      chainId: chainId,
    }
    const typedData = this.utils.getTypedData(dataToSign)
    const wallet = this.web3Client.getWallet()
    return this.utils.signEIP712TypedData(typedData, wallet[options.from].privateKey)
  }

  async transferWithSignature(sig: string, sellOrder: order, buyOrder: order, to: address, options: SendOptions) {
    if (!options.from) {
      throw new Error('options.from is missing')
    }
    let web3Util = this.web3Client.web3.utils
    let data = web3Util.soliditySha3(
      {
        t: 'bytes32',
        v: sellOrder.orderId,
      },
      {
        t: 'address',
        v: buyOrder.token,
      },
      {
        t: 'uint256',
        v: buyOrder.amount,
      }
    )

    const txObj = this.getERC721TokenContract(sellOrder.token).methods.transferWithSig(
      sig,
      sellOrder.amount,
      data,
      sellOrder.expiry,
      to
    )
    const _options = await this.web3Client.fillOptions(txObj, false /* onRootChain */, options)
    return this.web3Client.send(txObj, _options)
  }

  depositERC20ForUser(token: address, user: address, amount: BN | string, options?: SendOptions) {
    if (options && (!options.from || !amount || !token)) {
      throw new Error('options.from, token or amount is missing')
    }
    return this.depositManager.depositERC20ForUser(token, amount, user, options)
  }

  async safeDepositERC721Tokens(token: address, tokenId: BN, options?: SendOptions) {
    if (!options || !options.from || !tokenId || !token) {
      throw new Error('options.from, token or tokenId is missing')
    }
    const txObject = this.getERC721TokenContract(token, true).methods.safeTransferFrom(
      options.from,
      this.depositManager.getAddress(),
      tokenId
    )
    const _options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (_options.encodeAbi) {
      return Object.assign(_options, { data: txObject.encodeABI(), to: token })
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
