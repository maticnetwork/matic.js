import BN from 'bn.js'

import Web3Client from './Web3Client'

import { address } from '../types/Common'

export default class ContractsBase {
  static MATIC_CHILD_TOKEN: address = '0x0000000000000000000000000000000000001010'

  web3Client: Web3Client
  network: any

  constructor(web3Client: Web3Client, network: any) {
    this.web3Client = web3Client
    this.network = network
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
    const eth = parent ? this.web3Client.parentEth : this.web3Client.eth
    return new eth.Contract(this.network.abi('ChildERC20'), token)
  }

  public getERC721TokenContract(token: address, parent: boolean = false) {
    const eth = parent ? this.web3Client.parentEth : this.web3Client.eth
    return new eth.Contract(this.network.abi('ChildERC721'), token)
  }

  public getChildMaticContract() {
    return new this.web3Client.eth.Contract(this.network.abi('MRC20'), ContractsBase.MATIC_CHILD_TOKEN)
  }

  public getPOSERC20TokenContract(token: address, parent: boolean = false) {
    const eth = parent ? this.web3Client.parentEth : this.web3Client.eth
    return new eth.Contract(this.network.abi('ChildERC20', 'pos'), token)
  }

  public getPOSERC721TokenContract(token: address, parent: boolean = false) {
    const eth = parent ? this.web3Client.parentEth : this.web3Client.eth
    return new eth.Contract(this.network.abi('ChildERC721', 'pos'), token)
  }

  public getPOSERC1155TokenContract(token: address, parent: boolean = false) {
    const eth = parent ? this.web3Client.parentEth : this.web3Client.eth
    return new eth.Contract(this.network.abi('ChildERC1155', 'pos'), token)
  }
}
