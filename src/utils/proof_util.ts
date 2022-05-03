import { BaseWeb3Client } from "../abstracts";
import { MerkleTree } from "./merkle_tree";
import { bufferToHex, keccak256, rlp, setLengthLeft, toBuffer } from "ethereumjs-util";
import { ITransactionReceipt, IBlock, IBlockWithTransaction } from "../interfaces";
import { mapPromise } from "./map_promise";
import { BaseTrie as TRIE } from 'merkle-patricia-tree';
import { BlockHeader } from '@ethereumjs/block';
import { Converter, promiseResolve, utils } from "..";
import Common, { Chain, Hardfork } from '@ethereumjs/common';

// Implementation adapted from Tom French's `matic-proofs` library used under MIT License
// https://github.com/TomAFrench/matic-proofs

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
                    const leaves = Array.from({ length: 2 ** heightDifference }, () => toBuffer(leafRoots));
                    leaves[0] = remainingNodesHash;
                    const subTreeMerkleRoot = new MerkleTree(leaves).getRoot();
                    reversedProof.push(subTreeMerkleRoot);
                }
                rightBound = newRightBound;
            }
        }

        return reversedProof.reverse();
    }

    static buildBlockProof(maticWeb3: BaseWeb3Client, startBlock: number, endBlock: number, blockNumber: number) {
        return ProofUtil.getFastMerkleProof(
            maticWeb3, blockNumber, startBlock, endBlock
        ).then(proof => {
            return bufferToHex(
                Buffer.concat(
                    proof.map(p => {
                        return toBuffer(p);
                    })
                )
            );
        });
    }

    static queryRootHash(client: BaseWeb3Client, startBlock: number, endBlock: number) {
        return client.getRootHash(startBlock, endBlock).then(rootHash => {
            return toBuffer(`0x${rootHash}`);
        }).catch(_ => {
            return null;
        });
    }

    static recursiveZeroHash(n: number, client: BaseWeb3Client) {
        if (n === 0) return '0x0000000000000000000000000000000000000000000000000000000000000000';
        const subHash = this.recursiveZeroHash(n - 1, client);
        return keccak256(
            toBuffer(client.encodeParameters([subHash, subHash], ['bytes32', 'bytes32'],))
        );
    }

    static getReceiptProof(receipt: ITransactionReceipt, block: IBlockWithTransaction, web3: BaseWeb3Client, requestConcurrency = Infinity, receiptsVal?: ITransactionReceipt[]) {
        const stateSyncTxHash = bufferToHex(ProofUtil.getStateSyncTxHash(block));
        const receiptsTrie = new TRIE();
        let receiptPromise: Promise<ITransactionReceipt[]>;
        if (!receiptsVal) {
            const receiptPromises = [];
            block.transactions.forEach(tx => {
                if (tx.transactionHash === stateSyncTxHash) {
                    // ignore if tx hash is bor state-sync tx
                    return;
                }
                receiptPromises.push(
                    web3.getTransactionReceipt(tx.transactionHash)
                );
            });
            receiptPromise = mapPromise(
                receiptPromises,
                val => {
                    return val;
                },
                {
                    concurrency: requestConcurrency,
                }
            );
        }
        else {
            receiptPromise = promiseResolve(receiptsVal);
        }

        return receiptPromise.then(receipts => {
            return Promise.all(
                receipts.map(siblingReceipt => {
                    const path = rlp.encode(siblingReceipt.transactionIndex);
                    const rawReceipt = ProofUtil.getReceiptBytes(siblingReceipt);
                    return receiptsTrie.put(path, rawReceipt);
                })
            );
        }).then(_ => {
            return receiptsTrie.findPath(rlp.encode(receipt.transactionIndex), true);
        }).then(result => {
            if (result.remaining.length > 0) {
                throw new Error('Node does not contain the key');
            }
            // result.node.value
            const prf = {
                blockHash: toBuffer(receipt.blockHash),
                parentNodes: result.stack.map(s => s.raw()),
                root: ProofUtil.getRawHeader(block).receiptTrie,
                path: rlp.encode(receipt.transactionIndex),
                value: ProofUtil.isTypedReceipt(receipt) ? result.node.value : rlp.decode(result.node.value)
            };
            return prf;
        });
    }

    static isTypedReceipt(receipt: ITransactionReceipt) {
        const hexType = Converter.toHex(receipt.type);
        return receipt.status != null && hexType !== "0x0" && hexType !== "0x";
    }

    // getStateSyncTxHash returns block's tx hash for state-sync receipt
    // Bor blockchain includes extra receipt/tx for state-sync logs,
    // but it is not included in transactionRoot or receiptRoot.
    // So, while calculating proof, we have to exclude them.
    //
    // This is derived from block's hash and number
    // state-sync tx hash = keccak256("matic-bor-receipt-" + block.number + block.hash)
    static getStateSyncTxHash(block): Buffer {
        return keccak256(
            Buffer.concat([
                // prefix for bor receipt
                Buffer.from('matic-bor-receipt-', 'utf-8'),
                setLengthLeft(toBuffer(block.number), 8), // 8 bytes of block number (BigEndian)
                toBuffer(block.hash), // block hash
            ])
        );
    }

    static getReceiptBytes(receipt: ITransactionReceipt) {
        let encodedData = rlp.encode([
            toBuffer(
                receipt.status !== undefined && receipt.status != null ? (receipt.status ? '0x1' : '0x') : receipt.root
            ),
            toBuffer(receipt.cumulativeGasUsed),
            toBuffer(receipt.logsBloom),
            // encoded log array
            receipt.logs.map(l => {
                // [address, [topics array], data]
                return [
                    toBuffer(l.address), // convert address to buffer
                    l.topics.map(toBuffer), // convert topics to buffer
                    toBuffer(l.data), // convert data to buffer
                ];
            }),
        ]);
        if (ProofUtil.isTypedReceipt(receipt)) {
            encodedData = Buffer.concat([toBuffer(receipt.type), encodedData]);
        }
        return encodedData;
    }

    static getRawHeader(_block) {
        _block.difficulty = Converter.toHex(_block.difficulty) as any;
        const common = new Common({
            chain: Chain.Mainnet, hardfork: Hardfork.London
        });
        const rawHeader = BlockHeader.fromHeaderData(_block, {
            common: common
        });
        return rawHeader;
    }
}
