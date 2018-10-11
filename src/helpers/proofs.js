import Trie from 'merkle-patricia-tree'
import utils from 'ethereumjs-util'
import EthereumTx from 'ethereumjs-tx'
import EthereumBlock from 'ethereumjs-block/from-rpc'

import MerkleTree from './merkle-tree'

const rlp = utils.rlp

export function getTxBytes(tx) {
  const txObj = new EthereumTx(squanchTx(tx))
  return txObj.serialize()
}

export async function getTxProof(tx, block) {
  const txTrie = new Trie()
  for (let i = 0; i < block.transactions.length; i++) {
    const siblingTx = block.transactions[i]
    const path = rlp.encode(siblingTx.transactionIndex)
    const rawSignedSiblingTx = getTxBytes(siblingTx)
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
    txTrie.findPath(
      rlp.encode(tx.transactionIndex),
      (err, rawTxNode, reminder, stack) => {
        if (err) {
          return reject(err)
        }

        if (reminder.length > 0) {
          return reject(new Error('Node does not contain the key'))
        }

        const prf = {
          blockHash: utils.toBuffer(tx.blockHash),
          parentNodes: stack.map(s => s.raw),
          root: getRawHeader(block).transactionsTrie,
          path: rlp.encode(tx.transactionIndex),
          value: rlp.decode(rawTxNode.value),
        }
        resolve(prf)
      }
    )
  })
}

export function getReceiptBytes(receipt) {
  let status = receipt.root
  if (receipt.status !== undefined && receipt.status !== null) {
    status = receipt.status
    if (status === true) {
      status = '0x01'
    } else if (status === false) {
      status = '0x00'
    }
  }

  // raw receipt = rlp.encode([status or root, cumulativeGasUsed, logsBloom, logs])
  return rlp.encode([
    utils.toBuffer(status),
    utils.toBuffer(receipt.cumulativeGasUsed),
    utils.toBuffer(receipt.logsBloom),

    // encoded log array
    receipt.logs.map(l => {
      // [address, [topics array], data]
      return [
        utils.toBuffer(l.address), // convert address to buffer
        l.topics.map(utils.toBuffer), // convert topics to buffer
        utils.toBuffer(l.data), // convert data to buffer
      ]
    }),
  ])
}

export async function getReceiptProof(receipt, block, web3) {
  const receiptsTrie = new Trie()
  const receiptPromises = []
  block.transactions.forEach(tx => {
    receiptPromises.push(web3.eth.getTransactionReceipt(tx.hash))
  })

  const receipts = await Promise.all(receiptPromises)
  for (let i = 0; i < receipts.length; i++) {
    const siblingReceipt = receipts[i]
    const path = rlp.encode(siblingReceipt.transactionIndex)
    const rawReceipt = getReceiptBytes(siblingReceipt)
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
    receiptsTrie.findPath(
      rlp.encode(receipt.transactionIndex),
      (err, rawReceiptNode, reminder, stack) => {
        if (err) {
          return reject(err)
        }

        if (reminder.length > 0) {
          return reject(new Error('Node does not contain the key'))
        }

        const prf = {
          blockHash: utils.toBuffer(receipt.blockHash),
          parentNodes: stack.map(s => s.raw),
          root: getRawHeader(block).receiptTrie,
          path: rlp.encode(receipt.transactionIndex),
          value: rlp.decode(rawReceiptNode.value),
        }
        resolve(prf)
      }
    )
  })
}

export function verifyHeaderProof({ value, valueIndex, headerRoot, proof }) {
  const bufferedValue = utils.toBuffer(value)
  const tree = new MerkleTree([bufferedValue])
  return tree.verify(
    bufferedValue,
    valueIndex,
    utils.toBuffer(headerRoot),
    proof.map(p => utils.toBuffer(p))
  )
}

export function verifyTxProof(proof) {
  const path = utils.toBuffer(proof.path).toString('hex')
  const value = rlp.decode(utils.toBuffer(proof.value))
  const parentNodes = rlp.decode(utils.toBuffer(proof.parentNodes))
  const txRoot = utils.toBuffer(proof.root)

  try {
    var currentNode
    var len = parentNodes.length
    var nodeKey = txRoot
    var pathPtr = 0
    for (var i = 0; i < len; i++) {
      currentNode = parentNodes[i]
      const encodedNode = Buffer.from(
        utils.sha3(rlp.encode(currentNode)),
        'hex'
      )
      if (!nodeKey.equals(encodedNode)) {
        return false
      }

      if (pathPtr > path.length) {
        return false
      }

      switch (currentNode.length) {
        case 17: // branch node
          if (pathPtr === path.length) {
            if (currentNode[16] === rlp.encode(value)) {
              return true
            } else {
              return false
            }
          }
          nodeKey = currentNode[parseInt(path[pathPtr], 16)] // must === sha3(rlp.encode(currentNode[path[pathptr]]))
          pathPtr += 1
          break
        case 2:
          pathPtr += nibblesToTraverse(
            currentNode[0].toString('hex'),
            path,
            pathPtr
          )
          if (pathPtr === path.length) {
            // leaf node
            if (currentNode[1].equals(rlp.encode(value))) {
              return true
            } else {
              return false
            }
          } else {
            // extension node
            nodeKey = currentNode[1]
          }
          break
        default:
          return false
      }
    }
  } catch (e) {
    return false
  }
  return false
}

export function verifyReceiptProof(proof) {
  return verifyTxProof(proof, true)
}

//
// Helper methods
//

// raw header
function getRawHeader(_block) {
  if (typeof _block.difficulty !== 'string') {
    _block.difficulty = '0x' + _block.difficulty.toString(16)
  }

  const block = new EthereumBlock(_block)
  return block.header
}

// squanch transaction
export function squanchTx(tx) {
  tx.gasPrice = '0x' + parseInt(tx.gasPrice).toString(16)
  tx.value = '0x' + parseInt(tx.value).toString(16) || '0'
  tx.gas = '0x' + parseInt(tx.gas).toString(16)
  tx.data = tx.input
  return tx
}

function nibblesToTraverse(encodedPartialPath, path, pathPtr) {
  let partialPath
  if (
    String(encodedPartialPath[0]) === '0' ||
    String(encodedPartialPath[0]) === '2'
  ) {
    partialPath = encodedPartialPath.slice(2)
  } else {
    partialPath = encodedPartialPath.slice(1)
  }

  if (partialPath === path.slice(pathPtr, pathPtr + partialPath.length)) {
    return partialPath.length
  } else {
    throw new Error('path was wrong')
  }
}
