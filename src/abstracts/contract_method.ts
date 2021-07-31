import { ITransactionConfig, ISendResult } from "@/interfaces";

export abstract class BaseContractMethod {
    abstract read<T>(tx: ITransactionConfig,): Promise<T>;
    abstract write(tx: ITransactionConfig,): ISendResult;
    abstract estimateGas(tx: ITransactionConfig,): Promise<number>;
}