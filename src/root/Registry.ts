import Contract from 'web3/eth/contract'

import network from '../common/matic-protocol'
import ContractsBase from '../common/ContractsBase'
import { address } from '../types/Common'
import Web3Client from '../common/Web3Client'

export default class Registry extends ContractsBase {
  public registry: Contract

  constructor(registry: address, web3Client: Web3Client) {
    super(web3Client)
    this.registry = new this.web3Client.parentWeb3.eth.Contract(network.abi('Registry'), registry)
  }
}
