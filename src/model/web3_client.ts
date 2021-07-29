import { BaseContract } from "@/model";
import { IMethod, ITransactionConfig } from "@/interfaces";

export abstract class BaseWeb3Client {

    constructor(public provider: any) { }

    abstract getContract(address: string, abi: any): BaseContract;

    abstract read(config: ITransactionConfig): Promise<string>;

    abstract write(config: ITransactionConfig): Promise<any>;

    // abstract extend(property: string, methods: IMethod[])
}
