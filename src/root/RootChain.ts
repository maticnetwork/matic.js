import Contract from 'web3/eth/contract'
import RootChainArtifact from 'matic-protocol/contracts-core/artifacts/RootChain.json'

import ContractsBase from '../common/ContractsBase'
import { address } from '../types/Common'
import Web3Client from '../common/Web3Client'
import Proofs from 'matic-protocol/contracts-core/helpers/proofs.js'
import BN from 'bn.js'

export default class RootChain extends ContractsBase {
  public rootChain: Contract

  constructor(rootChain: address, web3Client: Web3Client) {
    super(web3Client)
    this.rootChain = new this.web3Client.parentWeb3.eth.Contract(RootChainArtifact.abi, rootChain)
  }

  getLastChildBlock() {
    return this.web3Client.call(this.rootChain.methods.getLastChildBlock())
  }

  async findHeaderBlockNumber(childBlockNumber: BN | string | number): Promise<BN> {
    childBlockNumber = new BN(childBlockNumber)
    let start = new BN(1)
    let end = new BN(await this.web3Client.call(this.rootChain.methods.currentHeaderBlock())).div(new BN(10000))
    console.log(start.toString(), end.toString())
    let ans
    while(start <= end) {
      if (start == end) { ans = start; break; }
      let mid = start.add(end).div(new BN(2))
      // if (!mid.mod(new BN('10000')).eq(new BN(0))) mid.sub(new BN('5000'))
      console.log('mid', mid.toString())
      const headerBlock = await this.web3Client.call(this.rootChain.methods.headerBlocks(mid.mul(new BN(10000)).toString()))
      const headerStart = new BN(headerBlock.start)
      const headerEnd = new BN(headerBlock.end)
      if (headerStart.lte(childBlockNumber) && childBlockNumber.lte(headerEnd)) {
        ans = mid
        break
      } else if (headerStart.gt(childBlockNumber)) {
        end = mid
      } else if (headerEnd.lt(childBlockNumber)) {
        start = mid
      }
    }
    return ans.mul(new BN(10000))
    // return new BN(851).mul(new BN(10000))
  }

  getRawContract() {
    return this.rootChain
  }

  // async submitCheckpoint(start, end) {
  //   const root = await Proofs.buildCheckpointRoot(this.web3Client.getMaticWeb3(), start, end)
  //   const validators = await Proofs.getWalletFromMnemonic()
  //   this.web3Client.send(
  //     this.rootChain
  //   )
  // }
}
