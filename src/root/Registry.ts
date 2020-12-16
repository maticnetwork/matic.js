import { Contract } from 'web3-eth-contract'

import ContractsBase from '../common/ContractsBase'
import { MaticClientInitializationOptions } from '../types/Common'
import Web3Client from '../common/Web3Client'

export default class Registry extends ContractsBase {
  public registry: Contract

  constructor(options: MaticClientInitializationOptions, web3Client: Web3Client) {
    super(web3Client, options.network)
    this.registry = new this.web3Client.parentWeb3.eth.Contract(options.network.abi('Registry'), options.registry)
  }
}
