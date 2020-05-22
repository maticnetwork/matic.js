import BN from 'bn.js'

import Web3Client from './Web3Client'
import network from './matic-protocol'

import { address } from '../types/Common'

export default class ContractsBase {
  static MATIC_CHILD_TOKEN: address = '0x0000000000000000000000000000000000001010'

  web3Client: Web3Client

  constructor(web3Client: Web3Client) {
    this.web3Client = web3Client
  }

  public encode(number: BN | string | number) {
    if (typeof number === 'number') {
      number = new BN(number)
    } else if (typeof number === 'string') {
      if (number.slice(0, 2) === '0x') return number
      number = new BN(number)
    }
    if (BN.isBN(number)) {
      return '0x' + number.toString(16)
    }
  }

  public getERC20TokenContract(token: address, parent: boolean = false) {
    const web3 = parent ? this.web3Client.parentWeb3 : this.web3Client.web3
    return new web3.eth.Contract(network.abi('ChildERC20'), token)
  }

  public getERC721TokenContract(token: address, parent: boolean = false) {
    const web3 = parent ? this.web3Client.parentWeb3 : this.web3Client.web3
    return new web3.eth.Contract(network.abi('ChildERC721'), token)
  }

  public getChildMaticContract() {
    return new this.web3Client.web3.eth.Contract(network.abi('MRC20'), ContractsBase.MATIC_CHILD_TOKEN)
  }

  // wrapWeb3Promise(promise, options) {
  //   const _emptyFunc = () => {}
  //   return promise
  //     .on('transactionHash', options.onTransactionHash || _emptyFunc)
  //     .on('receipt', options.onReceipt || _emptyFunc)
  //     .on('error', options.onError || _emptyFunc)
  // }
}
