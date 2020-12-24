import BN from 'bn.js'
import SDKClient from './common/SDKClient'
import { Utils } from './common/Utils'
import DepositManager from './root/DepositManager'
import POSRootChainManager from './root/POSRootChainManager'
import Registry from './root/Registry'
import RootChain from './root/RootChain'
import WithdrawManager from './root/WithdrawManager'
import { address, MaticClientInitializationOptions, order, SendOptions } from './types/Common'

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
    this.posRootChainManager = new POSRootChainManager(options, this.rootChain, this.web3Client)
  }

  approveERC20ForDeposit(rootToken: address, amount: BN | string, options?: SendOptions) {
    if (options && (!options.from || !amount || !rootToken)) {
      throw new Error('options.from, rootToken or amount is missing')
    }
    return this.posRootChainManager.approveERC20(rootToken, amount, options)
  }

  approveMaxERC20ForDeposit(rootToken: address, options?: SendOptions) {
    if (options && (!options.from || !rootToken)) {
      throw new Error('options.from, rootToken is missing')
    }
    return this.posRootChainManager.approveMaxERC20(rootToken, options)
  }

  getERC20Allowance(userAddress: address, token: address, options?: SendOptions) {
    if (options && (!token || !userAddress)) {
      throw new Error('user address, token is missing')
    }

    return this.posRootChainManager.allowanceOfERC20(userAddress, token, options)
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
    if (!this.web3Client.web3.utils.isAddress(childToken)) {
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
      throw new Error(`from missing`)
    }
    if (options && options.legacyProof) {
      return this.posRootChainManager.exitERC20(txHash, options)
    } else {
      return this.posRootChainManager.exitERC20Hermoine(txHash, options)
    }
  }

  isERC20ExitProcessed(txHash: string) {
    if (!txHash) {
      throw new Error(`txHash not provided`)
    }
    return this.posRootChainManager.isERC20ExitProcessed(txHash)
  }

  approveERC721ForDeposit(rootToken: address, tokenId: BN | string, options?: SendOptions) {
    if (options && (!options.from || !tokenId || !rootToken)) {
      throw new Error('options.from, rootToken or tokenId is missing')
    }
    return this.posRootChainManager.approveERC721(rootToken, tokenId, options)
  }

  isApprovedERC721ForDeposit(rootToken: address, tokenId: BN | string, options?: SendOptions) {
    if (options && (!options.from || !tokenId || !rootToken)) {
      throw new Error('options.from, rootToken or tokenId is missing')
    }
    return this.posRootChainManager.isApprovedERC721(rootToken, tokenId, options)
  }

  approveAllERC721ForDeposit(rootToken: address, options?: SendOptions) {
    if (options && (!options.from || !rootToken)) {
      throw new Error('options.from, rootToken is missing')
    }
    return this.posRootChainManager.approveAllERC721(rootToken, options)
  }

  isApprovedAllERC721ForDeposit(rootToken: address, userAddress: address, options?: SendOptions) {
    if (options && (!options.from || !rootToken)) {
      throw new Error('options.from, rootToken is missing')
    }
    return this.posRootChainManager.isApprovedForAllERC721(rootToken, userAddress, options)
  }

  depositERC721ForUser(rootToken: address, user: address, tokenId: BN | string, options?: SendOptions) {
    if (options && (!options.from || !tokenId || !rootToken || !user)) {
      throw new Error('options.from, rootToken, user, or tokenId is missing')
    }
    return this.posRootChainManager.depositERC721ForUser(rootToken, tokenId, user, options)
  }

  depositBatchERC721ForUser(rootToken: address, user: address, tokenIds: (BN | string)[], options?: SendOptions) {
    if (options && (!options.from || !tokenIds || !rootToken || !user)) {
      throw new Error('options.from, rootToken, user, or tokenIds is missing')
    }

    if (tokenIds.length > 20) {
      throw new Error('Number of tokens being deposited can not exceed the limit of 20')
    }
    return this.posRootChainManager.depositBatchERC721ForUser(rootToken, tokenIds, user, options)
  }

  burnERC721(childToken: address, tokenId: BN | string, options?: SendOptions) {
    if (!this.web3Client.web3.utils.isAddress(childToken)) {
      throw new Error(`${childToken} is not a valid token address`)
    }
    if (!tokenId) {
      // ${tokenId} will stringify it while printing which might be a problem
      throw new Error(`${tokenId} is not a tokenId`)
    }
    if (options && !options.from) {
      throw new Error(`options.from is missing`)
    }
    return this.posRootChainManager.burnERC721(childToken, tokenId, options)
  }

  burnBatchERC721(childToken: address, tokenIds: (BN | string)[], options?: SendOptions) {
    if (!this.web3Client.web3.utils.isAddress(childToken)) {
      throw new Error(`${childToken} is not a valid token address`)
    }
    if (!tokenIds) {
      // ${tokenId} will stringify it while printing which might be a problem
      throw new Error(`tokenIds is missing`)
    }
    if (tokenIds.length > 20) {
      throw new Error('Number of tokens being withdrawn can not exceed the limit of 20')
    }
    if (options && !options.from) {
      throw new Error(`options.from is missing`)
    }
    return this.posRootChainManager.burnBatchERC721(childToken, tokenIds, options)
  }

  exitERC721(txHash: string, options?: SendOptions) {
    if (!txHash) {
      throw new Error(`txHash not provided`)
    }
    if (options && !options.from) {
      throw new Error(`options.from is missing`)
    }
    if (options && options.legacyProof) {
      return this.posRootChainManager.exitERC721(txHash, options)
    } else {
      return this.posRootChainManager.exitERC721Hermoine(txHash, options)
    }
  }

  exitBatchERC721(txHash: string, options?: SendOptions) {
    if (!txHash) {
      throw new Error(`txHash not provided`)
    }
    if (options && !options.from) {
      throw new Error(`options.from is missing`)
    }

    if (options && options.legacyProof) {
      return this.posRootChainManager.exitBatchERC721(txHash, options)
    } else {
      return this.posRootChainManager.exitBatchERC721Hermoine(txHash, options)
    }
  }

  isERC721ExitProcessed(txHash: string) {
    if (!txHash) {
      throw new Error(`txHash not provided`)
    }
    return this.posRootChainManager.isERC721ExitProcessed(txHash)
  }

  isBatchERC721ExitProcessed(txHash: string) {
    if (!txHash) {
      throw new Error(`txHash not provided`)
    }
    return this.posRootChainManager.isBatchERC721ExitProcessed(txHash)
  }

  approveERC1155ForDeposit(rootToken: address, options?: SendOptions) {
    if (options && (!options.from || !rootToken)) {
      throw new Error('options.from or rootToken is missing')
    }
    return this.posRootChainManager.approveERC1155(rootToken, options)
  }

  depositSingleERC1155ForUser(
    rootToken: address,
    user: address,
    tokenId: BN | string,
    amount: BN | string,
    data?: string,
    options?: SendOptions
  ) {
    if (options && (!options.from || !tokenId || !amount || !rootToken || !user)) {
      throw new Error('options.from, rootToken, user, tokenId or amount is missing')
    }
    return this.posRootChainManager.depositSingleERC1155ForUser(rootToken, tokenId, amount, user, data, options)
  }

  depositBatchERC1155ForUser(
    rootToken: address,
    user: address,
    tokenIds: (BN | string)[],
    amounts: (BN | string)[],
    data?: string,
    options?: SendOptions
  ) {
    if (options && (!options.from || !tokenIds || !rootToken || !user)) {
      throw new Error('options.from, rootToken, user, tokenIds or amounts is missing')
    }
    return this.posRootChainManager.depositBatchERC1155ForUser(rootToken, tokenIds, amounts, user, data, options)
  }

  burnSingleERC1155(childToken: address, tokenId: BN | string, amount: BN | string, options?: SendOptions) {
    if (!this.web3Client.web3.utils.isAddress(childToken)) {
      throw new Error(`${childToken} is not a valid token address`)
    }
    if (!tokenId || !amount) {
      throw new Error(`tokenId or amount is missing`)
    }
    if (options && !options.from) {
      throw new Error(`options.from is missing`)
    }
    return this.posRootChainManager.burnSingleERC1155(childToken, tokenId, amount, options)
  }

  burnBatchERC1155(childToken: address, tokenIds: (BN | string)[], amounts: (BN | string)[], options?: SendOptions) {
    if (!this.web3Client.web3.utils.isAddress(childToken)) {
      throw new Error(`${childToken} is not a valid token address`)
    }
    if (!tokenIds || !amounts) {
      throw new Error(`tokenIds or amounts missing`)
    }
    if (options && !options.from) {
      throw new Error(`options.from is missing`)
    }
    return this.posRootChainManager.burnBatchERC1155(childToken, tokenIds, amounts, options)
  }

  exitSingleERC1155(txHash: string, options?: SendOptions) {
    if (!txHash) {
      throw new Error(`txHash not provided`)
    }
    if (options && !options.from) {
      throw new Error(`options.from is missing`)
    }

    if (options && options.legacyProof) {
      return this.posRootChainManager.exitSingleERC1155(txHash, options)
    } else {
      return this.posRootChainManager.exitSingleERC1155Hermoine(txHash, options)
    }
  }

  isSingleERC1155ExitProcessed(txHash: string) {
    if (!txHash) {
      throw new Error(`txHash not provided`)
    }
    return this.posRootChainManager.isSingleERC1155ExitProcessed(txHash)
  }

  exitBatchERC1155(txHash: string, options?: SendOptions) {
    if (!txHash) {
      throw new Error(`txHash not provided`)
    }
    if (options && !options.from) {
      throw new Error(`options.from is missing`)
    }

    if (options && options.legacyProof) {
      return this.posRootChainManager.exitBatchERC1155(txHash, options)
    } else {
      return this.posRootChainManager.exitBatchERC1155Hermoine(txHash, options)
    }
  }

  isBatchERC1155ExitProcessed(txHash: string) {
    if (!txHash) {
      throw new Error(`txHash not provided`)
    }
    return this.posRootChainManager.isBatchERC1155ExitProcessed(txHash)
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
      : this.web3Client.wrapWeb3Promise(web3Object.eth.sendTransaction(_options), options)
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

  approveMaxERC20TokensForDeposit(token: address, options?: SendOptions) {
    if (options && (!options.from || !token)) {
      throw new Error('options.from, token is missing')
    }

    return this.depositManager.approveMaxERC20(token, options)
  }

  getERC20Allowance(userAddress: address, token: address, options?: SendOptions) {
    if (options && (!token || !userAddress)) {
      throw new Error('user address, token is missing')
    }

    return this.depositManager.allowanceOfERC20(userAddress, token, options)
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
    const web3Options = await this.web3Client.fillOptions(txObj, false /* onRootChain */, options)
    return this.web3Client.send(txObj, web3Options, options)
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
    const web3Options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: token })
    }
    return this.web3Client.send(txObject, web3Options, options)
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
    if (options && options.legacyProof) {
      return this.withdrawManager.startExitWithBurntERC20Tokens(txHash, options)
    } else {
      return this.withdrawManager.startExitWithBurntERC20TokensHermoine(txHash, options)
    }
  }

  withdrawNFT(txHash: string, options?: SendOptions) {
    if (!txHash) {
      throw new Error(`txHash not provided`)
    }
    if (options && !options.from) {
      throw new Error(`options.from is missing`)
    }

    if (options && options.legacyProof) {
      return this.withdrawManager.startExitWithBurntERC721Tokens(txHash, options)
    } else {
      return this.withdrawManager.startExitWithBurntERC721TokensHermoine(txHash, options)
    }
  }

  processExits(tokenAddress: string | string[], options?: SendOptions) {
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
