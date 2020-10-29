import Web3 from 'web3'
import { SendOptions } from '../types/Common'

const logger = {
  info: require('debug')('maticjs:Web3Client'),
  debug: require('debug')('maticjs:debug:Web3Client'),
}

const EXTRAGASFORPROXYCALL = 1000000

export default class Web3Client {
  public parentWeb3: Web3
  public web3: Web3
  public parentDefaultOptions: SendOptions
  public maticDefaultOptions: SendOptions
  public events: any

  constructor(parentProvider, maticProvider, parentDefaultOptions, maticDefaultOptions) {
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

  async fillOptions(txObject: any, onRootChain: boolean, options?: SendOptions) {
    if (onRootChain) {
      return this._fillOptions(txObject, this.parentWeb3, options || this.parentDefaultOptions)
    }
    return this._fillOptions(txObject, this.web3, options || this.maticDefaultOptions)
  }

  private async _fillOptions(txObject, web3, _options) {
    if (!_options.from) throw new Error('from is not specified')
    const from = _options.from
    delete txObject.chainId

    const [gasLimit, gasPrice, nonce, chainId] = await Promise.all([
      !(_options.gasLimit || _options.gas)
        ? txObject.estimateGas({ from, value: _options.value })
        : _options.gasLimit || _options.gas,
      !_options.gasPrice ? web3.eth.getGasPrice() : _options.gasPrice,
      !_options.nonce ? web3.eth.getTransactionCount(from, 'pending') : _options.nonce,
      !_options.chainId ? web3.eth.net.getId() : _options.chainId,
    ])

    return {
      from,
      gas: gasLimit,
      gasLimit: gasLimit,
      gasPrice,
      nonce,
      chainId,
      value: _options.value || 0,
      to: _options.to || null,
      data: _options.data,
      encodeAbi: _options.encodeAbi || false,
    }
  }

  wrapWeb3Promise(promise, callbacks) {
    if (callbacks) {
      if (callbacks.onTransactionHash) {
        promise.on('transactionHash', callbacks.onTransactionHash)
      }
      if (callbacks.onReceipt) {
        promise.on('receipt', callbacks.onReceipt)
      }
      if (callbacks.onConfirmation) {
        promise.on('confirmation', callbacks.onConfirmation)
      }
      if (callbacks.onError) {
        promise.on('error', callbacks.onError)
      }
    }
    return promise
  }

  send(txObject, web3Options?, callbacks?) {
    const _web3Options = web3Options || {}

    // since we use the delegated proxy patterns, the following should be a good way to provide enough gas
    // apparently even when provided with a buffer of 20k, the call reverts. This shouldn't be happening because the actual gas used is less than what the estimation returns
    // providing higher buffer for now
    // @todo handle hex values of gas

    if (web3Options.parent) {
      _web3Options.gas = (_web3Options.gas || this.parentDefaultOptions.gas) + EXTRAGASFORPROXYCALL
      _web3Options.gasPrice = _web3Options.gasPrice || this.parentDefaultOptions.gasPrice
    } else {
      _web3Options.gas = _web3Options.gas || this.maticDefaultOptions.gas
      _web3Options.gasPrice = _web3Options.gasPrice || this.maticDefaultOptions.gasPrice
    }
    logger.debug('sending tx with', { _web3Options })
    return this.wrapWeb3Promise(txObject.send(_web3Options), callbacks)
  }

  getParentWeb3() {
    return this.parentWeb3
  }

  getMaticWeb3() {
    return this.web3
  }

  getWallet() {
    return this.web3.eth.accounts.wallet
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
