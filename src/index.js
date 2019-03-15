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
import ChildERC721Artifacts from '../artifacts/ChildERC721'
import StandardTokenArtifacts from '../artifacts/StandardToken'
import WithdrawManagerArtifacts from '../artifacts/WithdrawManager'	

const rlp = utils.rlp

export default class Matic {
  constructor(options = {}) {
    this._throwIfNull(options.maticProvider, 'maticProvider is required')
    this._throwIfNull(options.parentProvider, 'parentProvider is required')

    this._web3 = new Web3(options.maticProvider)
    this._web3.matic = true
    this._parentWeb3 = new Web3(options.parentProvider)

    this._syncerUrl = options.syncerUrl
    this._watcherUrl = options.watcherUrl
    this._rootChainAddress = options.rootChainAddress
    this._maticWethAddress = options.maticWethAddress
    this._withdrawManagerAddress = options.withdrawManagerAddress	

    // create rootchain contract
    this._rootChainContract = new this._parentWeb3.eth.Contract(
      RootChainArtifacts.abi,
      this._rootChainAddress
    )

    // create withdraw manager contract	
    this._withdrawManagerContract = new this._parentWeb3.eth.Contract(	
      WithdrawManagerArtifacts.abi,	
      this._withdrawManagerAddress	
    )

    // internal cache
    this._tokenCache = {}
    this._tokenMappedCache = {}
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

  async getMappedTokenAddress(address) {
    const _a = address.toLowerCase()
    if (!this._tokenMappedCache[_a]) {
      this._tokenMappedCache[
        _a
      ] = await this._depositManagerContract.methods.tokens(_a).call()
    }
    return this._tokenMappedCache[_a]
  }

  async balanceOfERC721(address, token, options={}) {
    let web3Object = this._web3
    if (options.parent) {
      web3Object = this._parentWeb3
    }
    const balance = await this._getERC721TokenContract(token,web3Object).methods.balanceOf(address).call()
    return balance
  }

  async depositEthers(options = {}) {
    if (options && (!options.from || !options.value)) {
      throw new Error('Missing Parameters')
    }
    const depositTx = this._rootChainContract.methods.depositEthers()
    const _options = await this._fillOptions(
      options,
      depositTx,
      this._parentWeb3
    )

    return this._wrapWeb3Promise(depositTx.send(_options), options)
  }

  async approveERC20TokensForDeposit(token, amount, options = {}) {
    if (options && (!options.from || !amount || !token)) {
      throw new Error('Missing Parameters')
    }
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

  async depositERC20Tokens(token, user, amount, options = {}) {
    if (options && (!options.from || !token || !user || !amount)) {
      throw new Error('Missing Parameters')
    }
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

  async approveERC721TokenForDeposit(token, tokenId, options = {}) {
    if (options && (!options.from || !tokenId || !token)) {
      throw new Error('Missing Parameters')
    }
    
    const _tokenContract = this._getERC721TokenContract(token, this._parentWeb3)

    const approveTx = await _tokenContract.methods.approve(
      this._rootChainAddress,
      tokenId
    )
    const _options = await this._fillOptions(
      options,
      approveTx,
      this._parentWeb3
    )

    return this._wrapWeb3Promise(approveTx.send(_options), options)
  }

  async depositERC721Tokens(token, user, tokenId, options = {}) {
    if (options && (!options.from || !token || !user || !tokenId)) {
      throw new Error('Missing Parameters')
    }
    const depositTx = this._rootChainContract.methods.depositERC721(
      token,
      user,
      tokenId
    )
    const _options = await this._fillOptions(
      options,
      depositTx,
      this._parentWeb3
    )

    return this._wrapWeb3Promise(depositTx.send(_options), options)
  }

  async transferMaticEthers(to, amount, options) {
    if (options && (!options.from || !amount || !to)) {
      throw new Error('Missing Parameters')
    }
    const from = options.from

    const gasLimit = await this._web3.eth.estimateGas({
      from,
      value: amount,
    })
    options.gasLimit = gasLimit
    options.value = amount
    options.to = to
    const _options = await this._fillOptions(options, {}, this._web3)

    return this._wrapWeb3Promise(
      this._web3.eth.sendTransaction(_options),
      options
    )
  }

  async transferTokens(token, user, amount, options = {}) {
    if (options && (!options.from || !amount || !user || !token)) {
      throw new Error('Missing Parameters')
    }
    let web3Object = this._web3
    if (options.parent) {
      web3Object = this._parentWeb3
    }
    const _tokenContract = this._getERC20TokenContract(token, web3Object)
    const transferTx = _tokenContract.methods.transfer(user, amount)
    const _options = await this._fillOptions(options, transferTx, web3Object)
    return this._wrapWeb3Promise(transferTx.send(_options), options)
  }

  async transferERC721Tokens(token, user, tokenId, options = {}) {
    let web3Object = this._web3
    if (options.parent) {
      web3Object = this._parentWeb3
    }
    const _tokenContract = this._getERC721TokenContract(token, web3Object)
    const transferTx = _tokenContract.methods.transferFrom(
      options.from,
      user,
      tokenId
    )
    const _options = await this._fillOptions(options, transferTx, web3Object)
    return this._wrapWeb3Promise(transferTx.send(_options), options)
  }

  async transferEthers(to, amount, options = {}) {
    if (options && (!options.from || !amount || !to)) {
      throw new Error('Missing Parameters')
    }
    const from = options.from

    // if matic chain, transfer normal WETH tokens
    if (!options.parent) {
      return this.transferTokens(
        this._maticWethAddress,
        to,
        amount,
        options
      )
    }

    const gasLimit = await this._parentWeb3.eth.estimateGas({
      from,
      value: amount,
    })
    options.gasLimit = gasLimit
    options.value = amount
    options.to = to
    const _options = await this._fillOptions(options, {}, this._parentWeb3)

    return this._wrapWeb3Promise(
      this._parentWeb3.eth.sendTransaction(_options),
      options
    )
  }

  async startWithdraw(token, amount, options = {}) {
    if (options && (!options.from || !amount || !token)) {
      throw new Error('Missing Parameters')
    }
    const _tokenContract = this._getERC20TokenContract(token, this._web3)
    const withdrawTx = _tokenContract.methods.withdraw(amount)
    const _options = await this._fillOptions(options, withdrawTx, this._web3)
    return this._wrapWeb3Promise(withdrawTx.send(_options), options)
  }

  async startERC721Withdraw(token, tokenId, options = {}) {
    if (options && (!options.from || !tokenId || !token)) {
      throw new Error('Missing Parameters')
    }
    const _tokenContract = this._getERC721TokenContract(token, this._web3)
    const withdrawTx = _tokenContract.methods.withdraw(tokenId)
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
    let header = null
    try {
      header = await this.getHeaderObject(txProof.blockNumber)
    } catch (e) {
      // ignore error
    }

    // check if header block found
    if (!header) {
      throw new Error(
        `No corresponding checkpoint/header block found for ${txId}.`
      )
    }

    const headerProof = await this.getHeaderProof(txProof.blockNumber, header)

    const withdrawTx = this._withdrawManagerContract.methods.withdrawBurntTokens(
      header.number, // header block
      utils.bufferToHex(
        Buffer.concat(headerProof.proof.map(p => utils.toBuffer(p)))
      ), // header proof
      txProof.blockNumber, // block number
      txProof.blockTimestamp, // block timestamp
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

  async processExits(rootTokenAddress, options = {}) {
    const processExits = this._withdrawManagerContract.methods.processExits(rootTokenAddress)
    const _options = await this._fillOptions(
      options,
      processExits,
      this._parentWeb3
    )
    return this._wrapWeb3Promise(processExits.send(_options), options)

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
      .headerBlock(parseInt(currentHeaderBlock, 10) - 1)
      .call()

    const headerNumber = +currentHeaderBlock - 1
    const start = header.start
    const end = header.end
    const headers = await getHeaders(start, end, this._web3)
    const tree = new MerkleTree(headers)
    const headerProof = await tree.getProof(getBlockHeader(withdrawObj.block))

    const withdrawTxObject = this._withdrawManagerContract.methods.withdrawBurntTokens(
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

  _getERC20TokenContract(token, web3) {
    const _token = token.toLowerCase()

    let _tokenContract = this._tokenCache[_token]
    if (!_tokenContract) {
      _tokenContract = new web3.eth.Contract(ChildERC20Artifacts.abi, _token)
      // update token cache
      this._tokenCache[_token] = _tokenContract
    }

    return _tokenContract
  }

  _getERC721TokenContract(token, web3) {
    const _token = token.toLowerCase()

    let _tokenContract = this._tokenCache[_token]
    if (!_tokenContract) {
      _tokenContract = new web3.eth.Contract(ChildERC721Artifacts.abi, _token)
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
      // NOTE: Gas Price is set to '0', take care of type of gasPrice on  web3^1.0.0-beta.36
      !options.gasPrice ? !web3.matic ? await web3.eth.getGasPrice() : '0' : options.gasPrice,
      !options.nonce
        ? await web3.eth.getTransactionCount(from, 'pending')
        : options.nonce,
      !options.chainId ? await web3.eth.net.getId() : options.chainId,
    ])

    return {
      from,
      gasLimit,
      gas: gasLimit,
      gasPrice: gasPrice,
      nonce,
      chainId,
      value: options.value || 0,
      to: options.to || null,
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
      if (!res.ok) {
        const err = new Error(res.statusText || 'Unknown error occurred')
        err.response = res
        throw err
      }
      return res.json()
    })
  }
}
