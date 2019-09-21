import Web3Client from './Web3Client'

export default class ContractsBase {
  web3Client: Web3Client

  constructor(web3Client: Web3Client) {
    this.web3Client = web3Client
  }
}
