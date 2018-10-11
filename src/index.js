import 'isomorphic-fetch'

import Web3 from 'web3'
import utils from 'ethereumjs-util'
import queryString from 'query-string'

import {
  getTxBytes,
  getReceiptBytes,
  getTxProof,
  getReceiptProof,
  verifyTxProof,
  verifyReceiptProof,
  verifyHeaderProof,
} from './helpers/proofs'
import { getHeaders, getBlockHeader } from './helpers/blocks'
import MerkleTree from './helpers/merkle-tree'

import RootChainArtifacts from '../artifacts/RootChain'
import ChildERC20Artifacts from '../artifacts/ChildERC20'
import StandardTokenArtifacts from '../artifacts/StandardToken'

const rlp = utils.rlp

export default class Matic {
  constructor(options = {}) {
    this._throwIfNull(options.maticProvider, 'maticProvider is required')
    this._throwIfNull(options.parentProvider, 'parentProvider is required')

    this._web3 = new Web3(options.maticProvider)
    this._parentWeb3 = new Web3(options.parentProvider)

    this._syncerUrl = options.syncerUrl
    this._watcherUrl = options.watcherUrl
    this._rootChainAddress = options.rootChainAddress

    // create rootchain contract
    this._rootChainContract = new this._parentWeb3.eth.Contract(
      RootChainArtifacts.abi,
      this._rootChainAddress
    )

    // internal cache
    this._tokenCache = {}
  }

  //
  // Getters & setters
  //

  get web3() {
    return this._web3
  }

  get parentWeb3() {
    return this._parentWeb3
  }

  get wallet() {
    if (this._parentWeb3.eth.accounts.wallet.length >= 1) {
      return this._parentWeb3.eth.accounts.wallet[0]
    }
    return null
  }

  get walletAddress() {
    if (this.wallet) {
      return this.wallet.address
    }
    return null
  }

  set wallet(_wallet) {
    this._web3.eth.accounts.wallet.add(_wallet)
    this._parentWeb3.eth.accounts.wallet.add(_wallet)
  }

  //
  // Actions
  //

  newAccount() {
    return this._parentWeb3.eth.accounts.wallet.create(1)
  }

  async approveTokensForDeposit(token, amount, options = {}) {
    const _tokenContract = new this._parentWeb3.eth.Contract(
      StandardTokenArtifacts.abi,
      token
    )
    const approveTx = await _tokenContract.methods.approve(
      this._rootChainAddress,
      amount
    )
    const _options = await this._fillOptions(
      options,
      approveTx,
      this._parentWeb3
    )

    return this._wrapWeb3Promise(approveTx.send(_options), options)
  }

  async depositEthers(user, options = {}) {
    const depositTx = this._rootChainContract.methods.depositEthers(user)
    const _options = await this._fillOptions(
      options,
      depositTx,
      this._parentWeb3
    )

    return this._wrapWeb3Promise(depositTx.send(_options), options)
  }

  async depositTokens(token, user, amount, options = {}) {
    const depositTx = this._rootChainContract.methods.deposit(
      token,
      user,
      amount
    )
    const _options = await this._fillOptions(
      options,
      depositTx,
      this._parentWeb3
    )

    return this._wrapWeb3Promise(depositTx.send(_options), options)
  }

  async transferTokens(token, user, amount, options = {}) {
    const _tokenContract = this._getChildTokenContract(token)
    const transferTx = _tokenContract.methods.transfer(user, amount)
    const _options = await this._fillOptions(options, transferTx, this._web3)

    return this._wrapWeb3Promise(transferTx.send(_options), options)
  }

  async startWithdraw(token, amount, options = {}) {
    const _tokenContract = this._getChildTokenContract(token)
    const withdrawTx = _tokenContract.methods.withdraw(amount)
    const _options = await this._fillOptions(options, withdrawTx, this._web3)
    return this._wrapWeb3Promise(withdrawTx.send(_options), options)
  }

  async getTx(txId) {
    if (this._syncerUrl) {
      try {
        const response = await this._apiCall({
          url: `${this._syncerUrl}/tx/${txId}`,
        })

        if (response && response.tx) {
          return response.tx
        }
      } catch (e) {
        // ignore error
      }
    }

    return this._web3.eth.getTransaction(txId)
  }

  async getReceipt(txId) {
    if (this._syncerUrl) {
      try {
        const response = await this._apiCall({
          url: `${this._syncerUrl}/tx/${txId}/receipt`,
        })

        if (response && response.receipt) {
          return response.receipt
        }
      } catch (e) {
        // ignore error
      }
    }

    return this._web3.eth.getTransactionReceipt(txId)
  }

  async getTxProof(txId) {
    const { proof: txProof } = await this._apiCall({
      url: `${this._syncerUrl}/tx/${txId}/proof`,
    })

    return txProof
  }

  verifyTxProof(txProof) {
    return verifyTxProof(txProof)
  }

  async getReceiptProof(txId) {
    const { proof: receiptProof } = await this._apiCall({
      url: `${this._syncerUrl}/tx/${txId}/receipt/proof`,
    })

    return receiptProof
  }

  verifyReceiptProof(receiptProof) {
    return verifyReceiptProof(receiptProof)
  }

  getHeaderObject(blockNumber) {
    return this._apiCall({
      url: `${this._watcherUrl}/header/included/${blockNumber}`,
    })
  }

  async getHeaderProof(blockNumber, header) {
    const { proof: headerProof } = await this._apiCall({
      url: `${this._syncerUrl}/block/${blockNumber}/proof`,
      query: {
        start: +header.start,
        end: +header.end,
      },
    })

    return headerProof
  }

  verifyHeaderProof(headerProof) {
    return verifyHeaderProof(headerProof)
  }

  async withdraw(txId, options = {}) {
    // fetch trancation & receipt proof
    const [txProof, receiptProof] = await Promise.all([
      this.getTxProof(txId),
      this.getReceiptProof(txId),
    ])

    // fetch header object & header proof
    const header = await this.getHeaderObject(txProof.blockNumber)
    const headerProof = await this.getHeaderProof(txProof.blockNumber, header)

    const withdrawTx = this._rootChainContract.methods.withdraw(
      header.number.toString(), // header block
      utils.bufferToHex(
        Buffer.concat(headerProof.proof.map(p => utils.toBuffer(p)))
      ), // header proof
      txProof.blockNumber, // block number
      txProof.blockTimestamp.toString(), // block timestamp
      txProof.root, // tx root
      receiptProof.root, // receipt root
      utils.bufferToHex(rlp.encode(receiptProof.path)), // key for trie (both tx and receipt)
      txProof.value, // tx bytes
      txProof.parentNodes, // tx proof nodes
      receiptProof.value, // receipt bytes
      receiptProof.parentNodes // reciept proof nodes
    )

    const _options = await this._fillOptions(
      options,
      withdrawTx,
      this._parentWeb3
    )

    return this._wrapWeb3Promise(withdrawTx.send(_options), options)
  }

  async withdrawLocally(txId, options = {}) {
    const withdrawTx = await this._web3.eth.getTransaction(txId)
    const withdrawReceipt = await this._web3.eth.getTransactionReceipt(txId)
    const withdrawBlock = await this._web3.eth.getBlock(
      withdrawReceipt.blockNumber,
      true
    )

    // draft withdraw obj
    const withdrawObj = {
      txId: txId,
      block: withdrawBlock,
      tx: withdrawTx,
      receipt: withdrawReceipt,
    }

    const txProof = await getTxProof(withdrawObj.tx, withdrawObj.block)
    const receiptProof = await getReceiptProof(
      withdrawObj.receipt,
      withdrawObj.block,
      this._web3
    )

    const currentHeaderBlock = await this._rootChainContract.methods
      .currentHeaderBlock()
      .call()

    const header = await this._rootChainContract.methods
      .getHeaderBlock(parseInt(currentHeaderBlock, 10) - 1)
      .call()

    const headerNumber = +currentHeaderBlock - 1
    const start = header.start
    const end = header.end
    const headers = await getHeaders(start, end, this._web3)
    const tree = new MerkleTree(headers)
    const headerProof = await tree.getProof(getBlockHeader(withdrawObj.block))

    const withdrawTxObject = this._rootChainContract.methods.withdraw(
      headerNumber.toString(), // header block
      utils.bufferToHex(Buffer.concat(headerProof)), // header proof
      withdrawObj.block.number.toString(), // block number
      withdrawObj.block.timestamp.toString(), // block timestamp
      utils.bufferToHex(withdrawObj.block.transactionsRoot.toString()), // tx root
      utils.bufferToHex(withdrawObj.block.receiptsRoot.toString()), // tx root
      utils.bufferToHex(rlp.encode(receiptProof.path)), // key for trie (both tx and receipt)
      utils.bufferToHex(getTxBytes(withdrawObj.tx)), // tx bytes
      utils.bufferToHex(rlp.encode(txProof.parentNodes)), // tx proof nodes
      utils.bufferToHex(getReceiptBytes(withdrawObj.receipt)), // receipt bytes
      utils.bufferToHex(rlp.encode(receiptProof.parentNodes)) // reciept proof nodes
    )

    const _options = await this._fillOptions(
      options,
      withdrawTxObject,
      this._parentWeb3
    )

    return this._wrapWeb3Promise(withdrawTxObject.send(_options), options)
  }

  //
  // Internal methods
  //

  _throwIfNull(value, message) {
    if (!value) {
      throw new Error(message)
    }
  }

  _getChildTokenContract(token) {
    const _token = token.toLowerCase()

    let _tokenContract = this._tokenCache[_token]
    if (!_tokenContract) {
      _tokenContract = new this._web3.eth.Contract(
        ChildERC20Artifacts.abi,
        _token
      )
      // update token cache
      this._tokenCache[_token] = _tokenContract
    }

    return _tokenContract
  }

  async _fillOptions(options, txObject, web3) {
    // delete chain id
    delete txObject.chainId

    const from = options.from || this.walletAddress
    if (!from) {
      throw new Error(
        '`from` required in options or set wallet using maticObject.wallet = <private key>'
      )
    }

    const [gasLimit, gasPrice, nonce, chainId] = await Promise.all([
      !(options.gasLimit || options.gas)
        ? await txObject.estimateGas({ from, value: options.value })
        : options.gasLimit || options.gas,
      !options.gasPrice ? await web3.eth.getGasPrice() : options.gasPrice,
      !options.nonce
        ? await web3.eth.getTransactionCount(from, 'pending')
        : options.nonce,
      !options.chainId ? await web3.eth.net.getId() : options.chainId,
    ])

    return {
      from,
      gasLimit,
      gasPrice: gasPrice,
      nonce,
      chainId,
      value: options.value || 0,
    }
  }

  _wrapWeb3Promise(promise, options) {
    return promise
      .on('transactionHash', options.onTransactionHash)
      .on('receipt', options.onReceipt)
      .on('error', options.onError)
  }

  _apiCall(data = {}) {
    const headers = data.headers || {}

    const queryParams = data.query && queryString.stringify(data.query || {})

    const url = `${data.url}?${queryParams || ''}`

    return fetch(url, {
      method: data.method || (data.body ? 'POST' : 'GET'),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headers,
      },
      body: data.body ? JSON.stringify(data.body) : null,
    }).then(res => {
      return res.json()
    })
  }
}
