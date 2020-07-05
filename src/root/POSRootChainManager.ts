import BN from 'bn.js'
import Contract from 'web3/eth/contract'
import Web3 from 'web3'

import RootChainManagerArtifact from 'matic-pos-portal/artifacts/RootChainManager.json'

import ContractsBase from '../common/ContractsBase'
import { address, SendOptions, MaticClientInitializationOptions } from '../types/Common'
import Web3Client from '../common/Web3Client'
import RootChain from './RootChain'
import ExitManager from '../common/ExitManager'

const ERC20_TRANSFER_EVENT_SIG = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
const ERC721_TRANSFER_EVENT_SIG = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
const ERC1155_TRANSFER_SINGLE_EVENT_SIG = '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62'
const ERC1155_TRANSFER_BATCH_EVENT_SIG = '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb'

const web3 = new Web3()
const abiCoder: Web3['eth']['abi'] = web3.eth.abi

export default class POSRootChainManager extends ContractsBase {
  public posRootChainManager: Contract
  private exitManager: ExitManager
  private erc20Predicate: address | null
  private erc721Predicate: address | null
  private erc1155Predicate: address | null

  private formatUint256 = this.encode

  constructor(options: MaticClientInitializationOptions, rootChain: RootChain, web3Client: Web3Client) {
    super(web3Client, options.network)
    this.posRootChainManager = new this.web3Client.parentWeb3.eth.Contract(
      RootChainManagerArtifact.abi,
      options.posRootChainManager
    )
    this.exitManager = new ExitManager(rootChain, options, web3Client)
    this.erc20Predicate = options.posERC20Predicate
    this.erc721Predicate = options.posERC721Predicate
    this.erc1155Predicate = options.posERC1155Predicate
  }

  async depositEtherForUser(amount: BN | string, user: address, options: SendOptions = {}) {
    const txObject = this.posRootChainManager.methods.depositEtherFor(user)
    const _options = await this.web3Client.fillOptions(
      txObject,
      true /* onRootChain */,
      Object.assign(options, { value: this.formatUint256(amount) })
    )
    if (_options.encodeAbi) {
      return Object.assign(_options, { data: txObject.encodeABI(), to: this.posRootChainManager.options.address })
    }
    return this.web3Client.send(txObject, _options)
  }

  async depositFor(user: address, rootToken: address, depositData: string, options?: SendOptions) {
    if (!this.posRootChainManager.options.address) {
      throw new Error('posRootChainManager address not found. Set it while constructing MaticPOSClient.')
    }
    const txObject = this.posRootChainManager.methods.depositFor(user, rootToken, depositData)
    const _options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (_options.encodeAbi) {
      return Object.assign(_options, { data: txObject.encodeABI(), to: this.posRootChainManager.options.address })
    }
    return this.web3Client.send(txObject, _options)
  }

  async exit(burnTxHash: string, logSignature: string, options?: SendOptions) {
    if (!this.posRootChainManager.options.address) {
      throw new Error('posRootChainManager address not found. Set it while constructing MaticPOSClient.')
    }
    const payload = await this.exitManager.buildPayloadForExit(burnTxHash, logSignature)
    const txObject = this.posRootChainManager.methods.exit(payload)
    const _options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (_options.encodeAbi) {
      return Object.assign(_options, { data: txObject.encodeABI(), to: this.posRootChainManager.options.address })
    }
    return this.web3Client.send(txObject, _options)
  }

  async approveERC20(rootToken: address, amount: BN | string, options?: SendOptions) {
    if (!this.erc20Predicate) {
      throw new Error('posERC20Predicate address not found. Set it while constructing MaticPOSClient.')
    }
    const txObject = this.getPOSERC20TokenContract(rootToken, true).methods.approve(
      this.erc20Predicate,
      this.formatUint256(amount)
    )
    const _options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (_options.encodeAbi) {
      return Object.assign(_options, { data: txObject.encodeABI(), to: rootToken })
    }
    return this.web3Client.send(txObject, _options)
  }

  async depositERC20ForUser(rootToken: address, amount: BN | string, user: address, options?: SendOptions) {
    const depositData = abiCoder.encodeParameter('uint256', this.formatUint256(amount))
    return this.depositFor(user, rootToken, depositData, options)
  }

  async burnERC20(childToken: address, amount: BN | string, options?: SendOptions) {
    const childTokenContract = this.getPOSERC20TokenContract(childToken)
    const txObject = childTokenContract.methods.withdraw(this.formatUint256(amount))
    const _options = await this.web3Client.fillOptions(txObject, false /* onRootChain */, options)
    if (_options.encodeAbi) {
      return Object.assign(_options, { data: txObject.encodeABI(), to: childToken })
    }
    return this.web3Client.send(txObject, _options)
  }

  async exitERC20(burnTxHash: string, options?: SendOptions) {
    return this.exit(burnTxHash, ERC20_TRANSFER_EVENT_SIG, options)
  }

  async approveERC721(rootToken: address, tokenId: BN | string, options?: SendOptions) {
    if (!this.erc721Predicate) {
      throw new Error('posERC721Predicate address not found. Set it while constructing MaticPOSClient.')
    }
    const txObject = this.getPOSERC721TokenContract(rootToken, true).methods.approve(
      this.erc721Predicate,
      this.formatUint256(tokenId)
    )
    const _options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (_options.encodeAbi) {
      return Object.assign(_options, { data: txObject.encodeABI(), to: rootToken })
    }
    return this.web3Client.send(txObject, _options)
  }

  async depositERC721ForUser(rootToken: address, tokenId: BN | string, user: address, options?: SendOptions) {
    const depositData = abiCoder.encodeParameter('uint256', this.formatUint256(tokenId))
    return this.depositFor(user, rootToken, depositData, options)
  }

  async burnERC721(childToken: address, tokenId: BN | string, options?: SendOptions) {
    const childTokenContract = this.getPOSERC721TokenContract(childToken)
    const txObject = childTokenContract.methods.withdraw(this.formatUint256(tokenId))
    const _options = await this.web3Client.fillOptions(txObject, false /* onRootChain */, options)
    if (_options.encodeAbi) {
      return Object.assign(_options, { data: txObject.encodeABI(), to: childToken })
    }
    return this.web3Client.send(txObject, _options)
  }

  async exitERC721(burnTxHash: string, options?: SendOptions) {
    return this.exit(burnTxHash, ERC721_TRANSFER_EVENT_SIG, options)
  }

  async approveERC1155(rootToken: address, options?: SendOptions) {
    if (!this.erc1155Predicate) {
      throw new Error('posERC1155Predicate address not found. Set it while constructing MaticPOSClient.')
    }
    const txObject = this.getPOSERC1155TokenContract(rootToken, true).methods.setApprovalForAll(
      this.erc1155Predicate,
      true
    )
    const _options = await this.web3Client.fillOptions(txObject, true /* onRootChain */, options)
    if (_options.encodeAbi) {
      return Object.assign(_options, { data: txObject.encodeABI(), to: rootToken })
    }
    return this.web3Client.send(txObject, _options)
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
    const _options = await this.web3Client.fillOptions(txObject, false /* onRootChain */, options)
    if (_options.encodeAbi) {
      return Object.assign(_options, { data: txObject.encodeABI(), to: childToken })
    }
    return this.web3Client.send(txObject, _options)
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
    const _options = await this.web3Client.fillOptions(txObject, false /* onRootChain */, options)
    if (_options.encodeAbi) {
      return Object.assign(_options, { data: txObject.encodeABI(), to: childToken })
    }
    return this.web3Client.send(txObject, _options)
  }

  async exitSingleERC1155(burnTxHash: string, options?: SendOptions) {
    return this.exit(burnTxHash, ERC1155_TRANSFER_SINGLE_EVENT_SIG, options)
  }

  async exitBatchERC1155(burnTxHash: string, options?: SendOptions) {
    return this.exit(burnTxHash, ERC1155_TRANSFER_BATCH_EVENT_SIG, options)
  }
}
