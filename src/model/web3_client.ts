import { BaseContract } from "../model";
import { ITransactionConfig, ITransactionReceipt, ITransactionData, IBlock, IBlockWithTransaction, IJsonRpcRequestPayload, IJsonRpcResponse } from "../interfaces";

export abstract class BaseWeb3Client {

    constructor(public provider: any) { }

    abstract getContract(address: string, abi: any): BaseContract;

    abstract read(config: ITransactionConfig): Promise<string>;

    abstract write(config: ITransactionConfig): Promise<any>;
    abstract getGasPrice(): Promise<string>;
    abstract getChainId(): Promise<number>;
    abstract getTransactionCount(address: string, blockNumber: any): Promise<number>;

    abstract getTransaction(transactionHash: string): Promise<ITransactionData>;
    abstract getTransactionReceipt(transactionHash: string): Promise<ITransactionReceipt>;
    // abstract extend(property: string, methods: IMethod[])

    abstract getBlock(blockHashOrBlockNumber): Promise<IBlock>;
    abstract getBlockWithTransaction(blockHashOrBlockNumber): Promise<IBlockWithTransaction>;

    getRootHash(startBlock: number, endBlock: number) {
        return this.sendRPCRequest({
            jsonrpc: '2.0',
            method: 'eth_getRootHash',
            params: [Number(startBlock), Number(endBlock)],
            id: new Date().getTime()
        }).then(payload => {
            return String(payload.result);
        });
    }

    abstract sendRPCRequest(request: IJsonRpcRequestPayload): Promise<IJsonRpcResponse>;

    abstract encodeParameters(params: any[], types: any[]): string;
    abstract etheriumSha3(...value): string;
}
