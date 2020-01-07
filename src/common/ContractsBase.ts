import Web3Client from './Web3Client'
import BN from 'bn.js'
import assert from 'assert'
import ChildERC20Artifact from 'matic-protocol/contracts-core/artifacts/ChildERC20.json'
import ChildERC721Artifact from 'matic-protocol/contracts-core/artifacts/ChildERC721.json'

import { address, SendOptions } from '../types/Common'

export default class ContractsBase {
  web3Client: Web3Client

  constructor(web3Client: Web3Client) {
    this.web3Client = web3Client
  }

  public encode(number: BN | string) {
    if (BN.isBN(number)) {
      return '0x' + number.toString(16)
    } else if (typeof number === 'string') {
      assert.equal(number.slice(0, 2), '0x', 'expected a 0x prefixed string')
      return number
    }
  }

  public getERC20TokenContract(token: address, parent: boolean = false) {
    const web3 = parent ? this.web3Client.parentWeb3 : this.web3Client.web3
    return new web3.eth.Contract(ChildERC20Artifact.abi, token)
  }

  public getERC721TokenContract(token: address, parent: boolean = false) {
    const web3 = parent ? this.web3Client.parentWeb3 : this.web3Client.web3
    return new web3.eth.Contract(ChildERC721Artifact.abi, token)
  }

  async _fillOptions(options, txObject, web3) {
    delete txObject.chainId
    const from = options.from
    if (!from) {
      throw new Error(
        '`from` required in options or set wallet using maticObject.wallet = <private key>',
      )
    }

    const [gasLimit, gasPrice, nonce, chainId] = await Promise.all([
      !(options.gasLimit || options.gas)
        ? txObject.estimateGas({ from, value: options.value })
        : options.gasLimit || options.gas,
      !options.gasPrice ? web3.eth.getGasPrice() : options.gasPrice,
      !options.nonce
        ? web3.eth.getTransactionCount(from, 'pending')
        : options.nonce,
      !options.chainId ? web3.eth.net.getId() : options.chainId,
    ])
    return {
      from,
      gas: this.encode(gasLimit),
      gasPrice: this.encode(gasPrice),
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
}
