import { BaseContract } from "@/model";
import { IMethod, ITransactionConfig } from "@/interfaces";

export abstract class BaseWeb3Client {

    constructor(public provider: any) { }

    abstract getContract(address: string, abi: any): BaseContract;

    abstract read(config: ITransactionConfig): Promise<string>;

    abstract write(config: ITransactionConfig): Promise<any>;
    abstract getGasPrice(): Promise<string>;
    abstract getChainId(): Promise<number>;
    abstract getTransactionCount(address: string, blockNumber: any): Promise<number>;

    // abstract extend(property: string, methods: IMethod[])
}
