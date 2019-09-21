import Contract from 'web3/eth/contract'
import RootChainArtifact from 'matic-protocol/contracts-core/artifacts/RootChain.json'

import ContractsBase from '../common/ContractsBase'
import { address } from '../types/Common'
import Web3Client from '../common/Web3Client'

export default class RootChain extends ContractsBase {
  public rootChain: Contract

  constructor(rootChain: address, web3Client: Web3Client) {
    super(web3Client)
    this.rootChain = new this.web3Client.parentWeb3.eth.Contract(RootChainArtifact.abi, rootChain)
  }
}
