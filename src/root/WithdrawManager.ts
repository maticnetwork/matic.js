import Web3 from 'web3'
import Contract from 'web3/eth/contract'
import { address, SendOptions } from '../types/Common'
import WithdrawManagerArtifact from 'matic-protocol/contracts-core/artifacts/WithdrawManager.json'
import Proofs from 'matic-protocol/contracts-core/helpers/proofs.js'
import ChildERC20Artifact from 'matic-protocol/contracts-core/artifacts/ChildERC20.json'
import BN from 'bn.js'
import Web3Client from '../common/Web3Client'
import ContractsBase from '../common/ContractsBase'
import RootChain from './RootChain'

export default class WithdrawManager extends ContractsBase {
  public withdrawManager: Contract
  private rootChain: RootChain

  constructor(withdrawManager: address, rootChain: RootChain, web3Client: Web3Client) {
    super(web3Client)
    this.withdrawManager = new this.web3Client.parentWeb3.eth.Contract(WithdrawManagerArtifact.abi, withdrawManager)
    this.rootChain = rootChain
  }

  burnERC20Tokens(token: address, amount: BN | string, options?: SendOptions) {
    return this.web3Client.sendOnMatic(
      this._getERC20TokenContract(token).methods.withdraw(amount),
      options
    )
  }

  startExitWithBurntERC20Tokens(burnERC20TokensReceipt) {
    // check checkpoint
  }

  private _getERC20TokenContract(token: address) {
    return new this.web3Client.web3.eth.Contract(ChildERC20Artifact.abi, token)
  }
}
