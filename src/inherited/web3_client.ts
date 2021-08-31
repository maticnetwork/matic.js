import { BaseContract, BaseWeb3Client } from "../model";
import { Web3Contract } from "./eth_contract";
import Web3 from "web3";
import { ITransactionConfig, ITransactionData, ITransactionReceipt, IBlockWithTransaction, IJsonRpcRequestPayload, IJsonRpcResponse } from "../interfaces";
import { Transaction } from "web3/eth/types";
import { AbstractProvider } from "web3-core";

export class MaticWeb3Client extends BaseWeb3Client {
    private web3_: Web3;

    constructor(provider: any) {
        super(provider);
        this.web3_ = new Web3(provider);
    }

    read(config: ITransactionConfig) {
        return this.web3_.eth.call(config);
    }

    write(config: ITransactionConfig) {
        return this.web3_.eth.sendTransaction(config);
    }

    getContract(address: string, abi: any) {
        const cont = new this.web3_.eth.Contract(abi, address);
        return new Web3Contract(address, cont as any);
    }

    getGasPrice() {
        return this.web3_.eth.getGasPrice();
    }

    getTransactionCount(address: string, blockNumber: any) {
        return this.web3_.eth.getTransactionCount(address, blockNumber);
    }

    getChainId() {
        return this.web3_.eth.net.getId();
    }

    getTransaction(transactionHash: string) {
        return this.web3_.eth.getTransaction(transactionHash).then(data => {
            return this.toTransaction(data);
        });
    }

    private toTransaction(data: Transaction) {
        const tx: ITransactionData = data as any;
        tx.transactionHash = data.hash;
        return tx;
    }

    getTransactionReceipt(transactionHash: string): Promise<ITransactionReceipt> {
        return this.web3_.eth.getTransactionReceipt(transactionHash).then(data => {
            return {
                blockHash: data.blockHash,
                blockNumber: data.blockNumber,
                contractAddress: data.contractAddress,
                cumulativeGasUsed: data.cumulativeGasUsed,
                from: data.from,
                gasUsed: data.gasUsed,
                status: data.status,
                to: data.to,
                transactionHash: data.transactionHash,
                transactionIndex: data.transactionIndex,
                events: data.events,
                logs: data.logs,
                logsBloom: data.logsBloom,
                root: (data as any).root,
                type: (data as any).type
            } as ITransactionReceipt;
        });
    }

    getBlock(blockHashOrBlockNumber) {
        return (this.web3_.eth.getBlock(blockHashOrBlockNumber) as any);
    }

    getBlockWithTransaction(blockHashOrBlockNumber) {
        return this.web3_.eth.getBlock(blockHashOrBlockNumber, true).then(result => {
            const blockData: IBlockWithTransaction = result as any;
            blockData.transactions = result.transactions.map(tx => {
                return this.toTransaction(tx);
            });
            return blockData;
        });
    }

    sendRPCRequest(request: IJsonRpcRequestPayload) {
        return new Promise<IJsonRpcResponse>((res, rej) => {
            (this.web3_.currentProvider as AbstractProvider).send(request, (error, result) => {
                if (error) return rej(error);
                res(result);
            });
        });
    }

    encodeParameters(params: any[], types: any[]) {
        return this.web3_.eth.abi.encodeParameters(types, params);
    }

    etheriumSha3(...value) {
        return Web3.utils.soliditySha3(...value);
    }
}