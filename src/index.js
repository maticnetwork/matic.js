import "isomorphic-fetch"

import Web3 from "web3"
import utils from "ethereumjs-util"
import queryString from "query-string"

import {
  getTxBytes,
  getReceiptBytes,
  getTxProof,
  getReceiptProof
} from "./helpers/proofs"
import { getHeaders, getBlockHeader } from "./helpers/blocks"
import MerkleTree from "./helpers/merkle-tree"

import RootChainArtifacts from "./artifacts/RootChain"
import ChildERC20Artifacts from "./artifacts/ChildERC20"
import StandardTokenArtifacts from "./artifacts/StandardToken"

const rlp = utils.rlp

export default class Matic {
  constructor(options = {}) {
    this._throwIfNull(options.maticProvider, "maticProvider is required")
    this._throwIfNull(options.parentProvider, "parentProvider is required")

    this._web3 = new Web3(options.maticProvider)
    this._parentWeb3 = new Web3(options.parentProvider)

    this._syncerUrl = options.syncerUrl
    this._watcherUrl = options.watcherUrl

    // create rootchain contract
    this._rootChainContract = new this._parentWeb3.eth.Contract(
      RootChainArtifacts.abi,
      options.rootChainAddress
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

  get newAccount() {
    return this._parentWeb3.eth.accounts.wallet.create(1)
  }

  get wallet() {
    return this._parentWeb3.eth.accounts.wallet[0]
  }

  set wallet(_wallet) {
    this._web3.eth.accounts.wallet.add(_wallet)
    this._parentWeb3.eth.accounts.wallet.add(_wallet)
  }

  //
  // Actions
  //

  async approveTokens(token, spender, amount, options = {}) {
    const _tokenContract = new this._parentWeb3.eth.Contract(
      StandardTokenArtifacts.abi,
      token
    )

    return _tokenContract.methods.approve(spender, amount).send({
      from: this.wallet.address,
      ...options
    })
  }

  async depositEthers(user, amount, options = {}) {
    return this._rootChainContract.methods.depositEthers(user, amount).send({
      from: this.wallet.address,
      ...options
    })
  }

  async depositTokens(token, user, amount, options = {}) {
    return this._rootChainContract.methods
      .depositTokens(token, user, amount)
      .send({
        from: this.wallet.address,
        ...options
      })
  }

  async transferTokens(token, user, amount, options = {}) {
    const _tokenContract = this._getChildTokenContract(token)
    return _tokenContract.methods.transfer(user, amount).send({
      from: this.wallet.address,
      ...options
    })
  }

  async startWithdraw(token, amount, options = {}) {
    const _tokenContract = this._getChildTokenContract(token)
    return _tokenContract.methods.withdraw(amount).send({
      from: this.wallet.address,
      ...options
    })
  }

  getTx(txId) {
    return this._apiCall({
      url: `${this._syncerUrl}/tx/${txId}`
    })
  }

  getReceipt(txId) {
    return this._apiCall({
      url: `${this._syncerUrl}/tx/${txId}/receipt`
    })
  }

  async getTxProof(txId) {
    const { proof: txProof } = await this._apiCall({
      url: `${this._syncerUrl}/tx/${txId}/proof`
    })

    return txProof
  }

  async getReceiptProof(txId) {
    const { proof: receiptProof } = await this._apiCall({
      url: `${this._syncerUrl}/tx/${txId}/receipt/proof`
    })

    return receiptProof
  }

  getHeaderObject(blockNumber) {
    return this._apiCall({
      url: `${this._watcherUrl}/header/included/${blockNumber}`
    })
  }

  async getHeaderProof(blockNumber, header) {
    const { proof: headerProof } = await this._apiCall({
      url: `${this._syncerUrl}/block/${blockNumber}/proof`,
      query: {
        start: +header.start,
        end: +header.end
      }
    })

    return headerProof
  }

  async withdraw(txId, options = {}) {
    // fetch trancation & receipt proof
    const [txProof, receiptProof] = await Promise.all([
      this.getTxProof(txId),
      this.getReceiptProof(txId)
    ])

    // fetch header object & header proof
    const header = await this.getHeaderObject(txProof.blockNumber)
    const headerProof = await this.getHeaderProof(header, txProof.blockNumber)

    return this._rootChainContract.methods
      .withdraw(
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
      .send({
        from: this.wallet.address,
        ...options
      })
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
      receipt: withdrawReceipt
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

    return this._rootChainContract.methods
      .withdraw(
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
      .send({
        from: this.wallet.address,
        ...options
      })
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

  _apiCall(data = {}) {
    const headers = data.headers || {}
    const queryParams = data.query && queryString.stringify(data.query || {})
    const url = `${data.url}?${queryParams || ""}`
    return fetch(url, {
      method: data.method || (data.body ? "POST" : "GET"),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers
      },
      body: data.body ? JSON.stringify(data.body) : null
    }).then(res => {
      return res.json()
    })
  }
}
