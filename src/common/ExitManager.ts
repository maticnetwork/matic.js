import BN from 'bn.js'
import assert from 'assert'
import ethUtils from 'ethereumjs-util'
import axios from 'axios'
global.fetch = require('node-fetch')
import { HashZero } from '@ethersproject/constants'
import { keccak256 as solidityKeccak256 } from '@ethersproject/solidity'
import { JsonRpcProvider } from '@ethersproject/providers'
const MerkleTree = require('../libs/MerkleTree')
const ethers = require('ethers')

import Web3Client from './Web3Client'
import ContractsBase from './ContractsBase'
import RootChain from '../root/RootChain'
import { MaticClientInitializationOptions } from '../types/Common'
import Proofs from '../libs/ProofsUtil'

import Web3 from 'web3'
const web3 = new Web3()
const hash: Web3['utils']['soliditySha3'] = web3.utils.soliditySha3

const logger = {
  info: require('debug')('maticjs:WithdrawManager'),
  debug: require('debug')('maticjs:debug:WithdrawManager'),
}

export default class ExitManager extends ContractsBase {
  private rootChain: RootChain
  private networkApiUrl
  private customHttpProvider

  constructor(rootChain: RootChain, options: MaticClientInitializationOptions, web3Client: Web3Client) {
    super(web3Client, options.network)
    this.rootChain = rootChain
    this.networkApiUrl = options.network.Matic.NetworkAPI
    this.customHttpProvider = new ethers.providers.JsonRpcProvider(options.network.Matic.RPC)
  }

  async buildPayloadForExit(burnTxHash, logEventSig) {
    // check checkpoint
    const lastChildBlock = await this.rootChain.getLastChildBlock()
    const burnTx = await this.web3Client.getMaticWeb3().eth.getTransaction(burnTxHash)
    const receipt = await this.web3Client.getMaticWeb3().eth.getTransactionReceipt(burnTxHash)
    const block: any = await this.web3Client
      .getMaticWeb3()
      .eth.getBlock(burnTx.blockNumber, true /* returnTransactionObjects */)

    logger.info({ 'burnTx.blockNumber': burnTx.blockNumber, lastCheckPointedBlockNumber: lastChildBlock })
    assert.ok(
      new BN(lastChildBlock).gte(new BN(burnTx.blockNumber)),
      'Burn transaction has not been checkpointed as yet'
    )
    const headerBlockNumber = await this.rootChain.findHeaderBlockNumber(burnTx.blockNumber)
    const headerBlock = await this.web3Client.call(
      this.rootChain.rootChain.methods.headerBlocks(this.encode(headerBlockNumber))
    )
    logger.info({ headerBlockNumber: headerBlockNumber.toString(), headerBlock })

    // build block proof
    const blockProof = await Proofs.buildBlockProof(
      this.web3Client.getMaticWeb3(),
      parseInt(headerBlock.start, 10),
      parseInt(headerBlock.end, 10),
      parseInt(burnTx.blockNumber + '', 10)
    )

    const receiptProof: any = await Proofs.getReceiptProof(receipt, block, this.web3Client.getMaticWeb3())

    const logIndex =
      logEventSig == '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' ||
      logEventSig == '0xf871896b17e9cb7a64941c62c188a4f5c621b86800e3d15452ece01ce56073df' ||
      logEventSig == '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62' ||
      logEventSig == '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb'
        ? receipt.logs.findIndex(
            log =>
              log.topics[0].toLowerCase() == logEventSig.toLowerCase() &&
              log.topics[2].toLowerCase() == '0x0000000000000000000000000000000000000000000000000000000000000000'
          )
        : receipt.logs.findIndex(log => log.topics[0].toLowerCase() == logEventSig.toLowerCase())

    assert.ok(logIndex > -1, 'Log not found in receipt')

    return this._encodePayload(
      headerBlockNumber,
      blockProof,
      burnTx.blockNumber,
      block.timestamp,
      Buffer.from(block.transactionsRoot.slice(2), 'hex'),
      Buffer.from(block.receiptsRoot.slice(2), 'hex'),
      Proofs.getReceiptBytes(receipt), // rlp encoded
      receiptProof.parentNodes,
      receiptProof.path,
      logIndex
    )
  }

  async buildPayloadForExitHermoine(burnTxHash, logEventSig) {
    // check checkpoint
    const lastChildBlock = await this.rootChain.getLastChildBlock()
    const receipt = await this.web3Client.getMaticWeb3().eth.getTransactionReceipt(burnTxHash)
    const block: any = await this.web3Client
      .getMaticWeb3()
      .eth.getBlock(receipt.blockNumber, true /* returnTransactionObjects */)
    logger.info({ 'receipt.blockNumber': receipt.blockNumber, lastCheckPointedBlockNumber: lastChildBlock })
    assert.ok(
      new BN(lastChildBlock).gte(new BN(receipt.blockNumber)),
      'Burn transaction has not been checkpointed as yet'
    )
    let blockIncludedResponse = await axios.get(this.networkApiUrl + '/block-included/' + receipt.blockNumber)
    let headerBlock = blockIncludedResponse.data
    // build block proof

    const start = parseInt(headerBlock.start, 10)
    const end = parseInt(headerBlock.end, 10)
    const number = parseInt(receipt.blockNumber + '', 10)
    let blockProofResponse = await axios.get(
      `${this.networkApiUrl}/block-proof?start=${start}&end=${end}&number=${number}`
    )
    const blockProof = blockProofResponse.data.proof
    console.log(blockProof)

    let blockProofNew = await this.getFastMerkleProof(this.customHttpProvider, number, start, end)

    console.log(blockProofNew)
    const receiptProof: any = await Proofs.getReceiptProof(receipt, block, this.web3Client.getMaticWeb3())

    const logIndex =
      logEventSig == '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' ||
      logEventSig == '0xf871896b17e9cb7a64941c62c188a4f5c621b86800e3d15452ece01ce56073df' ||
      logEventSig == '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62' ||
      logEventSig == '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb'
        ? receipt.logs.findIndex(
            log =>
              log.topics[0].toLowerCase() == logEventSig.toLowerCase() &&
              log.topics[2].toLowerCase() == '0x0000000000000000000000000000000000000000000000000000000000000000'
          )
        : receipt.logs.findIndex(log => log.topics[0].toLowerCase() == logEventSig.toLowerCase())

    assert.ok(logIndex > -1, 'Log not found in receipt')
    return this._encodePayload(
      headerBlock.headerBlockNumber,
      blockProof,
      receipt.blockNumber,
      block.timestamp,
      Buffer.from(block.transactionsRoot.slice(2), 'hex'),
      Buffer.from(block.receiptsRoot.slice(2), 'hex'),
      Proofs.getReceiptBytes(receipt), // rlp encoded
      receiptProof.parentNodes,
      receiptProof.path,
      logIndex
    )
  }

  async queryRootHash(customHttpProvider: JsonRpcProvider, startBlock: number, endBlock: number) {
    return `0x${await customHttpProvider.send('eth_getRootHash', [startBlock, endBlock])}`
  }

  async recursiveZeroHash(n: number) {
    if (n === 0) return HashZero
    const subHash = this.recursiveZeroHash(n - 1)
    return solidityKeccak256(['bytes32', 'bytes32'], [subHash, subHash])
  }

  async getFastMerkleProof(
    customHttpProvider: JsonRpcProvider,
    blockNumber: number,
    startBlock: number,
    endBlock: number
  ): Promise<string[]> {
    const merkleTreeDepth = Math.ceil(Math.log2(endBlock - startBlock + 1))

    // We generate the proof root down, whereas we need from leaf up
    const reversedProof: string[] = []

    const offset = startBlock
    const targetIndex = blockNumber - offset
    let leftBound = 0
    let rightBound = endBlock - offset
    //   console.log("Searching for", targetIndex);
    for (let depth = 0; depth < merkleTreeDepth; depth += 1) {
      const nLeaves = 2 ** (merkleTreeDepth - depth)

      // The pivot leaf is the last leaf which is included in the left subtree
      const pivotLeaf = leftBound + nLeaves / 2 - 1

      if (targetIndex > pivotLeaf) {
        // Get the root hash to the merkle subtree to the left
        const newLeftBound = pivotLeaf + 1
        // eslint-disable-next-line no-await-in-loop
        const subTreeMerkleRoot = await this.queryRootHash(customHttpProvider, offset + leftBound, offset + pivotLeaf)
        reversedProof.push(subTreeMerkleRoot)
        leftBound = newLeftBound
      } else {
        // Things are more complex when querying to the right.
        // Root hash may come some layers down so we need to build a full tree by padding with zeros
        // Some trees may be completely empty

        const newRightBound = Math.min(rightBound, pivotLeaf)

        // Expect the merkle tree to have a height one less than the current layer
        const expectedHeight = merkleTreeDepth - (depth + 1)
        if (rightBound <= pivotLeaf) {
          // Tree is empty so we repeatedly hash zero to correct height
          const subTreeMerkleRoot = this.recursiveZeroHash(expectedHeight)
          reversedProof.push(subTreeMerkleRoot)
        } else {
          // Height of tree given by RPC node
          const subTreeHeight = Math.ceil(Math.log2(rightBound - pivotLeaf))

          // Find the difference in height between this and the subtree we want
          const heightDifference = expectedHeight - subTreeHeight

          // For every extra layer we need to fill 2*n leaves filled with the merkle root of a zero-filled Merkle tree
          // We need to build a tree which has heightDifference layers

          // The first leaf will hold the root hash as returned by the RPC
          // eslint-disable-next-line no-await-in-loop
          const remainingNodesHash = await this.queryRootHash(
            customHttpProvider,
            offset + pivotLeaf + 1,
            offset + rightBound
          )

          // The remaining leaves will hold the merkle root of a zero-filled tree of height subTreeHeight
          const leafRoots = this.recursiveZeroHash(subTreeHeight)

          // Build a merkle tree of correct size for the subtree using these merkle roots
          const leaves = Array.from({ length: 2 ** heightDifference }, () => leafRoots)
          leaves[0] = remainingNodesHash

          const subTreeMerkleRoot = new MerkleTree(leaves).getRoot()
          reversedProof.push(subTreeMerkleRoot)
        }
        rightBound = newRightBound
      }
    }

    return reversedProof.reverse()
  }

  async getExitHash(burnTxHash, logEventSig) {
    const lastChildBlock = await this.rootChain.getLastChildBlock()
    const receipt = await this.web3Client.getMaticWeb3().eth.getTransactionReceipt(burnTxHash)
    const block: any = await this.web3Client
      .getMaticWeb3()
      .eth.getBlock(receipt.blockNumber, true /* returnTransactionObjects */)

    assert.ok(
      new BN(lastChildBlock).gte(new BN(receipt.blockNumber)),
      'Burn transaction has not been checkpointed as yet'
    )

    const receiptProof: any = await Proofs.getReceiptProof(receipt, block, this.web3Client.getMaticWeb3())
    const logIndex = receipt.logs.findIndex(
      log =>
        log.topics[0].toLowerCase() == logEventSig.toLowerCase() &&
        log.topics[2].toLowerCase() == '0x0000000000000000000000000000000000000000000000000000000000000000'
    )
    assert.ok(logIndex > -1, 'Log not found in receipt')

    const nibbleArr = []
    receiptProof.path.forEach(byte => {
      nibbleArr.push(Buffer.from('0' + (byte / 0x10).toString(16), 'hex'))
      nibbleArr.push(Buffer.from('0' + (byte % 0x10).toString(16), 'hex'))
    })

    return hash(receipt.blockNumber, ethUtils.bufferToHex(Buffer.concat(nibbleArr)), logIndex)
  }

  private _encodePayload(
    headerNumber,
    buildBlockProof,
    blockNumber,
    timestamp,
    transactionsRoot,
    receiptsRoot,
    receipt,
    receiptParentNodes,
    path,
    logIndex
  ) {
    return ethUtils.bufferToHex(
      ethUtils.rlp.encode([
        headerNumber,
        buildBlockProof,
        blockNumber,
        timestamp,
        ethUtils.bufferToHex(transactionsRoot),
        ethUtils.bufferToHex(receiptsRoot),
        ethUtils.bufferToHex(receipt),
        ethUtils.bufferToHex(ethUtils.rlp.encode(receiptParentNodes)),
        ethUtils.bufferToHex(Buffer.concat([Buffer.from('00', 'hex'), path])),
        logIndex,
      ])
    )
  }
}
