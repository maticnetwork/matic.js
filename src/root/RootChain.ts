import Contract from 'web3/eth/contract'
import RootChainArtifact from 'matic-protocol/contracts-core/artifacts/RootChain.json'

import ContractsBase from '../common/ContractsBase'
import { address } from '../types/Common'
import Web3Client from '../common/Web3Client'
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
    // first checkpoint id = start * 10000
    let start = new BN(1)

    // last checkpoint id = end * 10000
    let end = new BN(await this.web3Client.call(this.rootChain.methods.currentHeaderBlock())).div(new BN(10000))

    // binary search on all the checkpoints to find the checkpoint that contains the childBlockNumber
    let ans
    while(start.lte(end)) {
      if (start.eq(end)) { ans = start; break }
      let mid = start.add(end).div(new BN(2))
      console.log({ start: start.toString(), mid: mid.toString(), end: end.toString() }) // eslint-disable-line
      const headerBlock = await this.web3Client.call(this.rootChain.methods.headerBlocks(mid.mul(new BN(10000)).toString()))
      // console.log('headerBlock', headerBlock)
      const headerStart = new BN(headerBlock.start)
      const headerEnd = new BN(headerBlock.end)
      if (headerStart.lte(childBlockNumber) && childBlockNumber.lte(headerEnd)) {
        // if childBlockNumber is between the upper and lower bounds of the headerBlock, we found our answer
        ans = mid
        break
      } else if (headerStart.gt(childBlockNumber)) {
        // childBlockNumber was checkpointed before this header
        end = mid.sub(new BN(1))
      } else if (headerEnd.lt(childBlockNumber)) {
        // childBlockNumber was checkpointed after this header
        start = mid.add(new BN(1))
      }
    }
    return ans.mul(new BN(10000))
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
