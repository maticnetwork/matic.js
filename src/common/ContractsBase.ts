import Web3Client from './Web3Client'
import BN from 'bn.js'
import assert from 'assert';

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
}
