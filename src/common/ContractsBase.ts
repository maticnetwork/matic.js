import Web3Client from './Web3Client'
import BN from 'bn.js'
import assert from 'assert';
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

  public getERC20TokenContract(token: address) {
    return new this.web3Client.web3.eth.Contract(ChildERC20Artifact.abi, token)
  }

  public getERC721TokenContract(token: address) {
    return new this.web3Client.web3.eth.Contract(ChildERC721Artifact.abi, token)
  }

  wrapWeb3Promise(promise, options) {
    const _emptyFunc = () => {}
    return promise
      .on('transactionHash', options.onTransactionHash || _emptyFunc)
      .on('receipt', options.onReceipt || _emptyFunc)
      .on('error', options.onError || _emptyFunc)
  }
}
