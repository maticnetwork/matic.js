import Web3 from 'web3'
import { SendOptions } from '../types/Common'

export default class Web3Client {
  public parentWeb3: Web3
  public web3: Web3
  public parentDefaultOptions: SendOptions
  public maticDefaultOptions: SendOptions

  constructor(
    parentProvider,
    maticProvider,
    parentDefaultOptions,
    maticDefaultOptions,
  ) {
    this.parentWeb3 = new Web3(parentProvider)
    this.web3 = new Web3(maticProvider)
    this.parentDefaultOptions = parentDefaultOptions
    this.maticDefaultOptions = maticDefaultOptions
  }

  set wallet(_wallet) {
    this.parentWeb3.eth.accounts.wallet.add(_wallet)
    this.web3.eth.accounts.wallet.add(_wallet)
  }

  async call(method, options?: SendOptions) {
    return method.call(options || this.parentDefaultOptions)
  }

  async _fillOptions(options, txObject, web3) {
    const _options = options || this.parentDefaultOptions
    if (!_options.from) return new Error('from is not specified')
    const from = _options.from
    delete txObject.chainId

    const [gasLimit, gasPrice, nonce, chainId] = await Promise.all([
      !(_options.gasLimit || _options.gas)
        ? txObject.estimateGas({ from, value: _options.value })
        : _options.gasLimit || _options.gas,
      !_options.gasPrice ? web3.eth.getGasPrice() : _options.gasPrice,
      !_options.nonce
        ? web3.eth.getTransactionCount(from, 'pending')
        : _options.nonce,
      !_options.chainId ? web3.eth.net.getId() : _options.chainId,
    ])

    return {
      from,
      gas: gasLimit,
      gasLimit: gasLimit,
      gasPrice,
      nonce,
      chainId,
      value: options.value || 0,
      to: options.to || null,
      data: options.data,
    }
  }

  wrapWeb3Promise(promise, options) {
    const _emptyFunc = () => {}
    return promise
      .on('transactionHash', options.onTransactionHash || _emptyFunc)
      .on('receipt', options.onReceipt || _emptyFunc)
      .on('error', options.onError || _emptyFunc)
  }

  async callOnMatic(method, options?) {
    return method.call(options || this.maticDefaultOptions)
  }

  async sendOnMatic(method, options?) {
    const _options = options || this.maticDefaultOptions
    if (!_options.from) return new Error('from is not specified')
    console.log('sending tx on matic with', _options) // eslint-disable-line
    return this.wrapWeb3Promise(method.send(_options), _options)
  }

  async send(txObject, options?) {
    const _options = options || {}

    // since we use the delegated proxy patterns, the following should be a good way to provide enough gas
    // apparently even when provided with a buffer of 20k, the call reverts. This shouldn't be happening because the actual gas used is less than what the estimation returns
    // providing higher buffer for now
    // @todo handle hex values of gas
    _options.gas = options.parent ? _options.gas + 1000000 : _options.gas
    _options.gasPrice = options.parent ? _options.gasPrice : 0

    return this.wrapWeb3Promise(txObject.send(_options), _options)
  }

  getParentWeb3() {
    return this.parentWeb3
  }

  getMaticWeb3() {
    return this.web3
  }

  setParentDefaultOptions(options: any) {
    this.parentDefaultOptions = options
  }

  setMaticDefaultOptions(options: any) {
    this.maticDefaultOptions = options
  }

  setParentProvider(provider) {
    this.parentWeb3 = new Web3(provider)
  }
}
