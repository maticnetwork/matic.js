import { Contract } from 'web3-eth-contract'

import ContractsBase from '../common/ContractsBase'
import { MaticClientInitializationOptions } from '../types/Common'
import Web3Client from '../common/Web3Client'
import BN from 'bn.js'

const logger = {
  info: require('debug')('maticjs:Web3Client'),
  debug: require('debug')('maticjs:debug:Web3Client'),
}

export default class RootChain extends ContractsBase {
  static BIG_ONE: BN = new BN(1)
  static BIG_TWO: BN = new BN(2)
  static CHECKPOINT_ID_INTERVAL: BN = new BN(10000)

  public rootChain: Contract

  constructor(options: MaticClientInitializationOptions, web3Client: Web3Client) {
    super(web3Client, options.network)
    this.rootChain = new this.web3Client.parentWeb3.eth.Contract(options.network.abi('RootChain'), options.rootChain)
  }

  getLastChildBlock() {
    return this.web3Client.call(this.rootChain.methods.getLastChildBlock())
  }

  async getCheckpointInclusion(burnTxHash) {
    // check checkpoint
    const lastChildBlock = await this.getLastChildBlock()
    const burnTx = await this.web3Client.getMaticWeb3().eth.getTransaction(burnTxHash)

    if (new BN(lastChildBlock).lt(new BN(burnTx.blockNumber))) {
      return 'Burn transaction has not been checkpointed as yet'
    }

    const headerBlockNumber = await this.findHeaderBlockNumber(burnTx.blockNumber)
    const headerBlock = await this.web3Client.call(this.rootChain.methods.headerBlocks(this.encode(headerBlockNumber)))
    return headerBlock
  }

  async findHeaderBlockNumber(childBlockNumber: BN | string | number): Promise<BN> {
    childBlockNumber = new BN(childBlockNumber)
    // first checkpoint id = start * 10000
    let start = RootChain.BIG_ONE

    // last checkpoint id = end * 10000
    let end = new BN(await this.web3Client.call(this.rootChain.methods.currentHeaderBlock())).div(
      RootChain.CHECKPOINT_ID_INTERVAL
    )

    // binary search on all the checkpoints to find the checkpoint that contains the childBlockNumber
    let ans
    while (start.lte(end)) {
      if (start.eq(end)) {
        ans = start
        break
      }
      let mid = start.add(end).div(RootChain.BIG_TWO)
      logger.debug({ start: start.toString(), mid: mid.toString(), end: end.toString() }) // eslint-disable-line
      const headerBlock = await this.web3Client.call(
        this.rootChain.methods.headerBlocks(mid.mul(RootChain.CHECKPOINT_ID_INTERVAL).toString())
      )
      const headerStart = new BN(headerBlock.start)
      const headerEnd = new BN(headerBlock.end)
      if (headerStart.lte(childBlockNumber) && childBlockNumber.lte(headerEnd)) {
        // if childBlockNumber is between the upper and lower bounds of the headerBlock, we found our answer
        ans = mid
        break
      } else if (headerStart.gt(childBlockNumber)) {
        // childBlockNumber was checkpointed before this header
        end = mid.sub(RootChain.BIG_ONE)
      } else if (headerEnd.lt(childBlockNumber)) {
        // childBlockNumber was checkpointed after this header
        start = mid.add(RootChain.BIG_ONE)
      }
    }
    return ans.mul(RootChain.CHECKPOINT_ID_INTERVAL)
  }
}
