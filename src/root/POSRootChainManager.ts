import BN from 'bn.js'
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'
import ContractsBase from '../common/ContractsBase'
import ExitManager from '../common/ExitManager'
import Web3Client from '../common/Web3Client'
import { address, MaticClientInitializationOptions, SendOptions } from '../types/Common'
import RootChain from './RootChain'

const ERC20_TRANSFER_EVENT_SIG = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
const ERC721_TRANSFER_EVENT_SIG = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
const ERC721_WITHDRAW_BATCH_EVENT_SIG = '0xf871896b17e9cb7a64941c62c188a4f5c621b86800e3d15452ece01ce56073df'
const ERC1155_TRANSFER_SINGLE_EVENT_SIG = '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62'
const ERC1155_TRANSFER_BATCH_EVENT_SIG = '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb'
const MESSAGE_SENT_EVENT_SIG = '0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036'
const TRANSFER_WITH_METADATA_EVENT_SIG = '0xf94915c6d1fd521cee85359239227480c7e8776d7caf1fc3bacad5c269b66a14'

const web3 = new Web3()
const abiCoder: Web3['eth']['abi'] = web3.eth.abi

export default class POSRootChainManager extends ContractsBase {
  public posRootChainManager: Contract
  private exitManager: ExitManager
  private erc20Predicate: address | null
  private erc721Predicate: address | null
  private erc1155Predicate: address | null
  private erc1155MintablePredicate: address | null
  private rootTunnelContractAbi: any

  private formatUint256 = this.encode

  constructor(options: MaticClientInitializationOptions, rootChain: RootChain, web3Client: Web3Client) {
    super(web3Client, options.network)
    this.posRootChainManager = new this.web3Client.parentWeb3.eth.Contract(
      options.network.abi('RootChainManager', 'pos'),
      options.posRootChainManager || options.network.Main.POSContracts.RootChainManagerProxy
    )
    this.rootTunnelContractAbi = options.network.abi('RootTunnel', 'pos')
    this.exitManager = new ExitManager(rootChain, options, web3Client)
    this.erc20Predicate = options.posERC20Predicate || options.network.Main.POSContracts.ERC20PredicateProxy
    this.erc721Predicate = options.posERC721Predicate || options.network.Main.POSContracts.ERC721PredicateProxy
    this.erc1155Predicate = options.posERC1155Predicate || options.network.Main.POSContracts.ERC1155PredicateProxy
    this.erc1155MintablePredicate =
      options.posMintableERC1155Predicate || options.network.Main.POSContracts.MintableERC1155PredicateProxy
  }

  async getPredicateAddress(rootToken: address) {
    const tokenType = await this.posRootChainManager.methods.tokenToType(rootToken).call()
    if (!tokenType) {
      throw new Error('Invalid Token Type')
    }
    const predicateAddress = await this.posRootChainManager.methods.typeToPredicate(tokenType).call()
    return predicateAddress
  }

  async depositEtherForUser(amount: BN | string, user: address, options: SendOptions = {}) {
    const txObject = this.posRootChainManager.methods.depositEtherFor(user)
    const web3Options = await this.web3Client.fillOptions(
      txObject,
      true /* onRootChain */,
      Object.assign(options, { value: this.formatUint256(amount) })
    )
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: this.posRootChainManager.options.address })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async depositFor(user: address, rootToken: address, depositData: string, options?: SendOptions) {
    if (!this.posRootChainManager.options.address) {
      throw new Error('posRootChainManager address not found. Set it while constructing MaticPOSClient.')
    }
    const txObject = this.posRootChainManager.methods.depositFor(user, rootToken, depositData)
    const web3Options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: this.posRootChainManager.options.address })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async exit(burnTxHash: string, logSignature: string, options?: SendOptions) {
    if (!this.posRootChainManager.options.address) {
      throw new Error('posRootChainManager address not found. Set it while constructing MaticPOSClient.')
    }
    const payload = await this.exitManager.buildPayloadForExit(burnTxHash, logSignature)
    const txObject = this.posRootChainManager.methods.exit(payload)
    const web3Options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: this.posRootChainManager.options.address })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async exitFastMerkle(start: any, end: any, blockNumber: any) {
    const proof = await this.exitManager.buildPayloadForExitFastMerkle(start, end, blockNumber)
    return proof
  }

  async exitHermoine(burnTxHash: string, logSignature: string, options?: SendOptions) {
    if (!this.posRootChainManager.options.address) {
      throw new Error('posRootChainManager address not found. Set it while constructing MaticPOSClient.')
    }
    const payload = await this.exitManager.buildPayloadForExitHermoine(burnTxHash, logSignature)
    const txObject = this.posRootChainManager.methods.exit(payload)
    const web3Options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: this.posRootChainManager.options.address })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async getERC20ExitPayload(burnTxHash: string) {
    const payload = await this.exitManager.buildPayloadForExit(burnTxHash, ERC20_TRANSFER_EVENT_SIG)
    return payload
  }

  async isExitProcessed(burnTxHash: string, logSignature: string) {
    const exitHash = await this.exitManager.getExitHash(burnTxHash, logSignature)
    return this.posRootChainManager.methods.processedExits(exitHash).call()
  }

  async processReceivedMessage(contractAddress: address, txHash: string, options?: SendOptions) {
    const payload = await this.exitManager.buildPayloadForExitHermoine(txHash, MESSAGE_SENT_EVENT_SIG)
    let rootTunnelContract = new this.web3Client.parentWeb3.eth.Contract(this.rootTunnelContractAbi, contractAddress)
    let txObject = rootTunnelContract.methods.receiveMessage(payload)
    const web3Options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: this.posRootChainManager.options.address })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async customPayload(txHash: string, eventSig: string) {
    const payload = await this.exitManager.buildPayloadForExitHermoine(txHash, eventSig)
    return payload
  }

  async approveERC20(rootToken: address, amount: BN | string, options?: SendOptions) {
    const predicate = await this.getPredicateAddress(rootToken)
    const txObject = this.getPOSERC20TokenContract(rootToken, true).methods.approve(
      predicate,
      this.formatUint256(amount)
    )
    const web3Options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: rootToken })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async approveMaxERC20(rootToken: address, options?: SendOptions) {
    const predicate = await this.getPredicateAddress(rootToken)
    const txObject = this.getPOSERC20TokenContract(rootToken, true).methods.approve(
      predicate,
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    )
    const web3Options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: rootToken })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async allowanceOfERC20(userAddress: address, token: address, options?: SendOptions) {
    if (options && (!token || !userAddress)) {
      throw new Error('token address or user address is missing')
    }
    const predicate = await this.getPredicateAddress(token)
    const allowance = await this.getPOSERC20TokenContract(token, true)
      .methods.allowance(userAddress, predicate)
      .call()

    return allowance
  }

  async depositERC20ForUser(rootToken: address, amount: BN | string, user: address, options?: SendOptions) {
    const depositData = abiCoder.encodeParameter('uint256', this.formatUint256(amount))
    return this.depositFor(user, rootToken, depositData, options)
  }

  async burnERC20(childToken: address, amount: BN | string, options?: SendOptions) {
    const childTokenContract = this.getPOSERC20TokenContract(childToken)
    const txObject = childTokenContract.methods.withdraw(this.formatUint256(amount))
    const web3Options = await this.web3Client.fillOptions(txObject, false /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: childToken })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async exitERC20(burnTxHash: string, options?: SendOptions) {
    return this.exit(burnTxHash, ERC20_TRANSFER_EVENT_SIG, options)
  }

  async exitERC20Hermoine(burnTxHash: string, options?: SendOptions) {
    return this.exitHermoine(burnTxHash, ERC20_TRANSFER_EVENT_SIG, options)
  }

  async isERC20ExitProcessed(burnTxHash: string) {
    return this.isExitProcessed(burnTxHash, ERC20_TRANSFER_EVENT_SIG)
  }

  async approveERC721(rootToken: address, tokenId: BN | string, options?: SendOptions) {
    const predicate = await this.getPredicateAddress(rootToken)
    const txObject = this.getPOSERC721TokenContract(rootToken, true).methods.approve(
      predicate,
      this.formatUint256(tokenId)
    )
    const web3Options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: rootToken })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async isApprovedERC721(token: address, tokenId: BN | string, options?: SendOptions) {
    if (options && !token) {
      throw new Error('token address is missing')
    }
    const predicate = await this.getPredicateAddress(token)
    const approved = await this.getPOSERC721TokenContract(token, true)
      .methods.getApproved(tokenId)
      .call()

    return approved == predicate
  }

  async approveAllERC721(rootToken: address, options?: SendOptions) {
    const predicate = await this.getPredicateAddress(rootToken)
    const txObject = this.getPOSERC721TokenContract(rootToken, true).methods.setApprovalForAll(predicate, true)
    const web3Options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: rootToken })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async isApprovedForAllERC721(token: address, userAddress: address, options?: SendOptions) {
    if (options && !token) {
      throw new Error('token address is missing')
    }
    const predicate = await this.getPredicateAddress(token)
    const approved = await this.getPOSERC721TokenContract(token, true)
      .methods.isApprovedForAll(userAddress, predicate)
      .call()

    return approved
  }

  async depositERC721ForUser(rootToken: address, tokenId: BN | string, user: address, options?: SendOptions) {
    const depositData = abiCoder.encodeParameter('uint256', this.formatUint256(tokenId))
    return this.depositFor(user, rootToken, depositData, options)
  }

  async depositBatchERC721ForUser(rootToken: address, tokenIds: (BN | string)[], user: address, options?: SendOptions) {
    let tokenIdArray = tokenIds.map(tokenId => {
      return this.formatUint256(tokenId)
    })
    const depositData = abiCoder.encodeParameter('uint256[]', tokenIdArray)
    return this.depositFor(user, rootToken, depositData, options)
  }

  async burnERC721(childToken: address, tokenId: BN | string, options?: SendOptions) {
    const childTokenContract = this.getPOSERC721TokenContract(childToken)
    const txObject = childTokenContract.methods.withdraw(this.formatUint256(tokenId))
    const web3Options = await this.web3Client.fillOptions(txObject, false /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: childToken })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async burnBatchERC721(childToken: address, tokenIds: (BN | string)[], options?: SendOptions) {
    let tokenIdArray = tokenIds.map(tokenId => {
      return this.formatUint256(tokenId)
    })
    const childTokenContract = this.getPOSERC721TokenContract(childToken)
    const txObject = childTokenContract.methods.withdrawBatch(tokenIdArray)
    const _options = await this.web3Client.fillOptions(txObject, false /* onRootChain */, options)
    if (_options.encodeAbi) {
      return Object.assign(_options, { data: txObject.encodeABI(), to: childToken })
    }
    return this.web3Client.send(txObject, _options)
  }

  async exitERC721(burnTxHash: string, options?: SendOptions) {
    return this.exit(burnTxHash, ERC721_TRANSFER_EVENT_SIG, options)
  }

  async exitBatchERC721(burnTxHash: string, options?: SendOptions) {
    return this.exit(burnTxHash, ERC721_WITHDRAW_BATCH_EVENT_SIG, options)
  }

  async exitERC721WithMetadata(burnTxHash: string, options?: SendOptions) {
    return this.exit(burnTxHash, TRANSFER_WITH_METADATA_EVENT_SIG, options)
  }

  async exitERC721WithMetadataHermoine(burnTxHash: string, options?: SendOptions) {
    return this.exitHermoine(burnTxHash, TRANSFER_WITH_METADATA_EVENT_SIG, options)
  }

  async exitBatchERC721Hermoine(burnTxHash: string, options?: SendOptions) {
    return this.exitHermoine(burnTxHash, ERC721_WITHDRAW_BATCH_EVENT_SIG, options)
  }

  async exitERC721Hermoine(burnTxHash: string, options?: SendOptions) {
    return this.exitHermoine(burnTxHash, ERC721_TRANSFER_EVENT_SIG, options)
  }

  async isERC721ExitProcessed(burnTxHash: string) {
    return this.isExitProcessed(burnTxHash, ERC721_TRANSFER_EVENT_SIG)
  }
  async isBatchERC721ExitProcessed(burnTxHash: string) {
    return this.isExitProcessed(burnTxHash, ERC721_WITHDRAW_BATCH_EVENT_SIG)
  }

  async approveERC1155(rootToken: address, options?: SendOptions) {
    const predicate = await this.getPredicateAddress(rootToken)
    const txObject = this.getPOSERC1155TokenContract(rootToken, true).methods.setApprovalForAll(predicate, true)
    const web3Options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: rootToken })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async approveMintableERC1155(rootToken: address, options?: SendOptions) {
    if (!this.erc1155Predicate) {
      throw new Error('posERC1155Predicate address not found. Set it while constructing MaticPOSClient.')
    }
    const txObject = this.getPOSERC1155TokenContract(rootToken, true).methods.setApprovalForAll(
      this.erc1155MintablePredicate,
      true
    )
    const web3Options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: rootToken })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async depositSingleERC1155ForUser(
    rootToken: address,
    tokenId: BN | string,
    amount: BN | string,
    user: address,
    data?: string,
    options?: SendOptions
  ) {
    const depositData = abiCoder.encodeParameters(
      ['uint256[]', 'uint256[]', 'bytes'],
      [[this.formatUint256(tokenId)], [this.formatUint256(amount)], data || '0x0']
    )
    return this.depositFor(user, rootToken, depositData, options)
  }

  async depositBatchERC1155ForUser(
    rootToken: address,
    tokenIds: (BN | string)[],
    amounts: (BN | string)[],
    user: address,
    data?: string,
    options?: SendOptions
  ) {
    const depositData = abiCoder.encodeParameters(
      ['uint256[]', 'uint256[]', 'bytes'],
      [tokenIds.map(t => this.formatUint256(t)), amounts.map(a => this.formatUint256(a)), data || '0x0']
    )
    return this.depositFor(user, rootToken, depositData, options)
  }

  async burnSingleERC1155(childToken: address, tokenId: BN | string, amount: BN | string, options?: SendOptions) {
    const childTokenContract = this.getPOSERC1155TokenContract(childToken)
    const txObject = childTokenContract.methods.withdrawSingle(this.formatUint256(tokenId), this.formatUint256(amount))
    const web3Options = await this.web3Client.fillOptions(txObject, false /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: childToken })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async burnBatchERC1155(
    childToken: address,
    tokenIds: (BN | string)[],
    amounts: (BN | string)[],
    options?: SendOptions
  ) {
    const childTokenContract = this.getPOSERC1155TokenContract(childToken)
    const txObject = childTokenContract.methods.withdrawBatch(
      tokenIds.map(t => this.formatUint256(t)),
      amounts.map(a => this.formatUint256(a))
    )
    const web3Options = await this.web3Client.fillOptions(txObject, false /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: childToken })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async exitSingleERC1155(burnTxHash: string, options?: SendOptions) {
    return this.exit(burnTxHash, ERC1155_TRANSFER_SINGLE_EVENT_SIG, options)
  }

  async exitSingleERC1155Hermoine(burnTxHash: string, options?: SendOptions) {
    return this.exitHermoine(burnTxHash, ERC1155_TRANSFER_SINGLE_EVENT_SIG, options)
  }

  async isSingleERC1155ExitProcessed(burnTxHash: string) {
    return this.isExitProcessed(burnTxHash, ERC1155_TRANSFER_SINGLE_EVENT_SIG)
  }

  async exitBatchERC1155(burnTxHash: string, options?: SendOptions) {
    return this.exit(burnTxHash, ERC1155_TRANSFER_BATCH_EVENT_SIG, options)
  }

  async exitBatchERC1155Hermoine(burnTxHash: string, options?: SendOptions) {
    return this.exitHermoine(burnTxHash, ERC1155_TRANSFER_BATCH_EVENT_SIG, options)
  }

  async isBatchERC1155ExitProcessed(burnTxHash: string) {
    return this.isExitProcessed(burnTxHash, ERC1155_TRANSFER_BATCH_EVENT_SIG)
  }
}
