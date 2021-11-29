import { BaseContract } from "../abstracts";
import { ITransactionRequestConfig, ITransactionReceipt, ITransactionData, IBlock, IBlockWithTransaction, IJsonRpcRequestPayload, IJsonRpcResponse, ITransactionWriteResult } from "../interfaces";
import { Logger } from "../utils";

export abstract class BaseWeb3Client {

    constructor(public logger: Logger) {

    }

    abstract getContract(address: string, abi: any): BaseContract;

    abstract read(config: ITransactionRequestConfig): Promise<string>;

    abstract write(config: ITransactionRequestConfig): ITransactionWriteResult;
    abstract getGasPrice(): Promise<string>;
    abstract estimateGas(config: ITransactionRequestConfig): Promise<number>;
    abstract getChainId(): Promise<number>;
    abstract getTransactionCount(address: string, blockNumber: any): Promise<number>;

    abstract getTransaction(transactionHash: string): Promise<ITransactionData>;
    abstract getTransactionReceipt(transactionHash: string): Promise<ITransactionReceipt>;
    // abstract extend(property: string, methods: IMethod[])

    abstract getBlock(blockHashOrBlockNumber): Promise<IBlock>;
    abstract getBlockWithTransaction(blockHashOrBlockNumber): Promise<IBlockWithTransaction>;

    getRootHash?(startBlock: number, endBlock: number) {
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
    abstract decodeParameters(hexString: string, types: any[]): any[];
    abstract etheriumSha3(...value): string;

}
