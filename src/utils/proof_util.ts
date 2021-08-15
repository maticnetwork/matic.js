import { BaseWeb3Client } from "src/model";
import { MerkleTree } from "./merkle_tree";
import ethUtils from "ethereumjs-util";
import { ITransactionReceipt, IBlock, IBlockWithTransaction } from "src/interfaces";
import { mapPromise } from "./map_promise";
const TRIE = require('merkle-patricia-tree');
const rlp = ethUtils.rlp;
import EthereumBlock from 'ethereumjs-block/from-rpc';


export class ProofUtil {

    static async getFastMerkleProof(
        web3: BaseWeb3Client,
        blockNumber: number,
        startBlock: number,
        endBlock: number
    ): Promise<string[]> {
        const merkleTreeDepth = Math.ceil(Math.log2(endBlock - startBlock + 1));

        // We generate the proof root down, whereas we need from leaf up
        const reversedProof: string[] = [];

        const offset = startBlock;
        const targetIndex = blockNumber - offset;
        let leftBound = 0;
        let rightBound = endBlock - offset;
        //   console.log("Searching for", targetIndex);
        for (let depth = 0; depth < merkleTreeDepth; depth += 1) {
            const nLeaves = 2 ** (merkleTreeDepth - depth);

            // The pivot leaf is the last leaf which is included in the left subtree
            const pivotLeaf = leftBound + nLeaves / 2 - 1;

            if (targetIndex > pivotLeaf) {
                // Get the root hash to the merkle subtree to the left
                const newLeftBound = pivotLeaf + 1;
                // eslint-disable-next-line no-await-in-loop
                const subTreeMerkleRoot = await this.queryRootHash(web3, offset + leftBound, offset + pivotLeaf);
                reversedProof.push(subTreeMerkleRoot);
                leftBound = newLeftBound;
            } else {
                // Things are more complex when querying to the right.
                // Root hash may come some layers down so we need to build a full tree by padding with zeros
                // Some trees may be completely empty

                const newRightBound = Math.min(rightBound, pivotLeaf);

                // Expect the merkle tree to have a height one less than the current layer
                const expectedHeight = merkleTreeDepth - (depth + 1);
                if (rightBound <= pivotLeaf) {
                    // Tree is empty so we repeatedly hash zero to correct height
                    const subTreeMerkleRoot = this.recursiveZeroHash(expectedHeight, web3);
                    reversedProof.push(subTreeMerkleRoot);
                } else {
                    // Height of tree given by RPC node
                    const subTreeHeight = Math.ceil(Math.log2(rightBound - pivotLeaf));

                    // Find the difference in height between this and the subtree we want
                    const heightDifference = expectedHeight - subTreeHeight;

                    // For every extra layer we need to fill 2*n leaves filled with the merkle root of a zero-filled Merkle tree
                    // We need to build a tree which has heightDifference layers

                    // The first leaf will hold the root hash as returned by the RPC
                    // eslint-disable-next-line no-await-in-loop
                    const remainingNodesHash = await this.queryRootHash(web3, offset + pivotLeaf + 1, offset + rightBound);

                    // The remaining leaves will hold the merkle root of a zero-filled tree of height subTreeHeight
                    const leafRoots = this.recursiveZeroHash(subTreeHeight, web3);

                    // Build a merkle tree of correct size for the subtree using these merkle roots
                    const leaves = Array.from({ length: 2 ** heightDifference }, () => ethUtils.toBuffer(leafRoots));
                    leaves[0] = remainingNodesHash;
                    console.log("leaves", leaves);
                    const subTreeMerkleRoot = new MerkleTree(leaves).getRoot();
                    reversedProof.push(subTreeMerkleRoot);
                }
                rightBound = newRightBound;
            }
        }

        return reversedProof.reverse();
    }

    static async buildBlockProof(maticWeb3: BaseWeb3Client, startBlock: number, endBlock: number, blockNumber: number) {
        const proof = await ProofUtil.getFastMerkleProof(maticWeb3, blockNumber, startBlock, endBlock);
        return ethUtils.bufferToHex(
            Buffer.concat(
                proof.map(p => {
                    return ethUtils.toBuffer(p);
                })
            )
        );
    }

    static async queryRootHash(client: BaseWeb3Client, startBlock: number, endBlock: number) {
        try {
            console.log("rootHash1");
            const rootHash = await client.getRootHash(startBlock, endBlock);
            console.log("rootHash", rootHash);
            return ethUtils.toBuffer(`0x${rootHash}`);
        } catch (err) {
            console.error("err", err);
            return null;
        }
    }

    static recursiveZeroHash(n: number, client: BaseWeb3Client) {
        if (n === 0) return '0x0000000000000000000000000000000000000000000000000000000000000000';
        const subHash = this.recursiveZeroHash(n - 1, client);
        return ethUtils.keccak256(
            ethUtils.toBuffer(client.encodeParameters([subHash, subHash], ['bytes32', 'bytes32'],))
        );
    }

    static async getReceiptProof(receipt: ITransactionReceipt, block: IBlockWithTransaction, web3: BaseWeb3Client, requestConcurrency = Infinity, receipts?: ITransactionReceipt[]) {
        const stateSyncTxHash = ethUtils.bufferToHex(ProofUtil.getStateSyncTxHash(block));
        const receiptsTrie = new TRIE();
        const receiptPromises = [];
        if (!receipts) {
            block.transactions.forEach(tx => {
                if (tx.transactionHash === stateSyncTxHash) {
                    // ignore if tx hash is bor state-sync tx
                    return;
                }
                receiptPromises.push(
                    web3.getTransactionReceipt(tx.transactionHash)
                );
            });
            receipts = await mapPromise(
                receiptPromises,
                val => {
                    return val;
                },
                {
                    concurrency: requestConcurrency,
                }
            );
        }

        for (let i = 0, length = receipts.length; i < length; i++) {
            const siblingReceipt = receipts[i];
            const path = rlp.encode(siblingReceipt.transactionIndex);
            const rawReceipt = ProofUtil.getReceiptBytes(siblingReceipt);
            await new Promise((resolve, reject) => {
                receiptsTrie.put(path, rawReceipt, err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({});
                    }
                });
            });
        }

        // promise
        return new Promise((resolve, reject) => {
            receiptsTrie.findPath(rlp.encode(receipt.transactionIndex), (err, rawReceiptNode, reminder, stack) => {
                if (err) {
                    return reject(err);
                }

                if (reminder.length > 0) {
                    return reject(new Error('Node does not contain the key'));
                }

                const prf = {
                    blockHash: ethUtils.toBuffer(receipt.blockHash),
                    parentNodes: stack.map(s => s.raw),
                    root: ProofUtil.getRawHeader(block).receiptTrie,
                    path: rlp.encode(receipt.transactionIndex),
                    value: rlp.decode(rawReceiptNode.value),
                };
                resolve(prf);
            });
        });
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
        );
    }

    static getReceiptBytes(receipt: ITransactionReceipt) {
        let encodedData = rlp.encode([
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
                ];
            }),
        ]);
        if (receipt.status !== undefined && receipt.status !== null && receipt.type !== '0x0' && receipt.type !== '0x') {
            encodedData = Buffer.concat([ethUtils.toBuffer(receipt.type), encodedData]);
        }
        return encodedData;
    }

    static getRawHeader(_block) {
        if (typeof _block.difficulty !== 'string') {
            _block.difficulty = '0x' + _block.difficulty.toString(16);
        }
        const block = new EthereumBlock(_block);
        return block.header;
    }
}