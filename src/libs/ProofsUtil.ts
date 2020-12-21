import fetch from 'node-fetch'

const BN = require('bn.js')
const bluebird = require('bluebird')
const Trie = require('merkle-patricia-tree')
const EthereumTx = require('ethereumjs-tx')
const ethUtils = require('ethereumjs-util')
const MerkleTree = require('./MerkleTree')
const EthereumBlock = require('ethereumjs-block/from-rpc')
const rlp = ethUtils.rlp

const logger = {
  info: require('debug')('maticjs:Web3Client'),
  debug: require('debug')('maticjs:debug:Web3Client'),
}

// TODO: remove proofs util and use plasma-core library
export default class ProofsUtil {
  static getBlockHeader(block) {
    const n = new BN(block.number).toArrayLike(Buffer, 'be', 32)
    const ts = new BN(block.timestamp).toArrayLike(Buffer, 'be', 32)
    const txRoot = ethUtils.toBuffer(block.transactionsRoot)
    const receiptsRoot = ethUtils.toBuffer(block.receiptsRoot)
    return ethUtils.keccak256(Buffer.concat([n, ts, txRoot, receiptsRoot]))
  }

  static async buildCheckpointRoot(web3, start, end) {
    logger.debug('buildCheckpointRoot...')
    const tree = await ProofsUtil.buildBlockHeaderMerkle(web3, start, end)
    return ethUtils.bufferToHex(tree.getRoot())
  }

  static async buildBlockProof(web3, start, end, blockNumber) {
    logger.debug('buildBlockProof...', start, end, blockNumber)
    const tree = await ProofsUtil.buildBlockHeaderMerkle(web3, start, end)
    const proof = tree.getProof(ProofsUtil.getBlockHeader(await web3.eth.getBlock(blockNumber)))
    return ethUtils.bufferToHex(Buffer.concat(proof))
  }

  static async buildBlockProofHermoine(web3, start, end, blockNumber, networkApiUrl) {
    logger.debug('buildBlockProof...', start, end, blockNumber)
    const tree = await ProofsUtil.buildBlockHeaderMerkleHermoine(start, end, networkApiUrl)
    const proof = tree.getProof(ProofsUtil.getBlockHeader(await web3.eth.getBlock(blockNumber)))
    return ethUtils.bufferToHex(Buffer.concat(proof))
  }

  static async buildBlockHeaderMerkleHermoine(start, end, networkApiUrl) {
    let response = await fetch(networkApiUrl + '/generate-proof?start=' + start + '&end=' + end)
    let logDetails = await response.json()
    let logs = logDetails.merkle_headerblocks
    const headers = new Array(end - start + 1)
    for (let i = 0; i < end - start + 1; i++) {
      headers[i] = ProofsUtil.getBlockHeader(logs[i])
    }
    return new MerkleTree(headers)
  }

  static async buildBlockHeaderMerkle(web3, start, end) {
    const headers = new Array(end - start + 1)
    await bluebird.map(
      headers,
      // eslint-disable-next-line
      async (_, i) => {
        logger.debug('fetching block', i + start)
        headers[i] = ProofsUtil.getBlockHeader(await web3.eth.getBlock(i + start))
      },
      { concurrency: 20 }
    )
    return new MerkleTree(headers)
  }

  static async getTxProof(tx, block) {
    const txTrie = new Trie()
    const stateSyncTxHash = ethUtils.bufferToHex(ProofsUtil.getStateSyncTxHash(block))

    for (let i = 0; i < block.transactions.length; i++) {
      const siblingTx = block.transactions[i]
      if (siblingTx.hash === stateSyncTxHash) {
        // ignore if tx hash is bor state-sync tx
        continue
      }
      const path = rlp.encode(siblingTx.transactionIndex)
      const rawSignedSiblingTx = ProofsUtil.getTxBytes(siblingTx)
      await new Promise((resolve, reject) => {
        txTrie.put(path, rawSignedSiblingTx, err => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      })
    }

    // promise
    return new Promise((resolve, reject) => {
      txTrie.findPath(rlp.encode(tx.transactionIndex), (err, rawTxNode, reminder, stack) => {
        if (err) {
          return reject(err)
        }

        if (reminder.length > 0) {
          return reject(new Error('Node does not contain the key'))
        }

        const prf = {
          blockHash: ethUtils.toBuffer(tx.blockHash),
          parentNodes: stack.map(s => s.raw),
          root: ProofsUtil.getRawHeader(block).transactionsTrie,
          path: rlp.encode(tx.transactionIndex),
          value: rlp.decode(rawTxNode.value),
        }
        resolve(prf)
      })
    })
  }

  static getTxBytes(tx) {
    const txObj = new EthereumTx(ProofsUtil.squanchTx(tx))
    return txObj.serialize()
  }

  static squanchTx(tx) {
    tx.gasPrice = '0x' + parseInt(tx.gasPrice).toString(16)
    tx.value = '0x' + parseInt(tx.value).toString(16) || '0'
    tx.gas = '0x' + parseInt(tx.gas).toString(16)
    tx.data = tx.input
    return tx
  }

  static getRawHeader(_block) {
    if (typeof _block.difficulty !== 'string') {
      _block.difficulty = '0x' + _block.difficulty.toString(16)
    }
    const block = new EthereumBlock(_block)
    return block.header
  }

  static async getReceiptProof(receipt, block, web3, receipts?) {
    const stateSyncTxHash = ethUtils.bufferToHex(ProofsUtil.getStateSyncTxHash(block))
    const receiptsTrie = new Trie()
    const receiptPromises = []
    if (!receipts) {
      block.transactions.forEach(tx => {
        if (tx.hash === stateSyncTxHash) {
          // ignore if tx hash is bor state-sync tx
          return
        }
        receiptPromises.push(web3.eth.getTransactionReceipt(tx.hash))
      })
      receipts = await Promise.all(receiptPromises)
    }

    for (let i = 0; i < receipts.length; i++) {
      const siblingReceipt = receipts[i]
      const path = rlp.encode(siblingReceipt.transactionIndex)
      const rawReceipt = ProofsUtil.getReceiptBytes(siblingReceipt)
      await new Promise((resolve, reject) => {
        receiptsTrie.put(path, rawReceipt, err => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      })
    }

    // promise
    return new Promise((resolve, reject) => {
      receiptsTrie.findPath(rlp.encode(receipt.transactionIndex), (err, rawReceiptNode, reminder, stack) => {
        if (err) {
          return reject(err)
        }

        if (reminder.length > 0) {
          return reject(new Error('Node does not contain the key'))
        }

        const prf = {
          blockHash: ethUtils.toBuffer(receipt.blockHash),
          parentNodes: stack.map(s => s.raw),
          root: ProofsUtil.getRawHeader(block).receiptTrie,
          path: rlp.encode(receipt.transactionIndex),
          value: rlp.decode(rawReceiptNode.value),
        }
        resolve(prf)
      })
    })
  }

  static getReceiptBytes(receipt) {
    return rlp.encode([
      ethUtils.toBuffer(
        receipt.status !== undefined && receipt.status != null ? (receipt.status ? '0x1' : '0x') : receipt.root
      ),
      ethUtils.toBuffer(receipt.cumulativeGasUsed),
      ethUtils.toBuffer(receipt.logsBloom),

      // encoded log array
      receipt.logs.map(l => {
        // [address, [topics array], data]
        return [
          ethUtils.toBuffer(l.address), // convert address to buffer
          l.topics.map(ethUtils.toBuffer), // convert topics to buffer
          ethUtils.toBuffer(l.data), // convert data to buffer
        ]
      }),
    ])
  }

  // getStateSyncTxHash returns block's tx hash for state-sync receipt
  // Bor blockchain includes extra receipt/tx for state-sync logs,
  // but it is not included in transactionRoot or receiptRoot.
  // So, while calculating proof, we have to exclude them.
  //
  // This is derived from block's hash and number
  // state-sync tx hash = keccak256("matic-bor-receipt-" + block.number + block.hash)
  static getStateSyncTxHash(block): Buffer {
    return ethUtils.keccak256(
      Buffer.concat([
        ethUtils.toBuffer('matic-bor-receipt-'), // prefix for bor receipt
        ethUtils.setLengthLeft(ethUtils.toBuffer(block.number), 8), // 8 bytes of block number (BigEndian)
        ethUtils.toBuffer(block.hash), // block hash
      ])
    )
  }
}
