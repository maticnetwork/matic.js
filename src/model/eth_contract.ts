import { ITransactionConfig, ISendResult, ITransactionResult } from "../interfaces";

export abstract class BaseContract {

    constructor(public address: string) {

    }

    abstract read<T>(methodName: string, tx: ITransactionConfig, ...args): Promise<T>;
    abstract write(methodName: string, tx: ITransactionConfig, ...args): ISendResult;
    abstract createTransaction(methodName: string, tx?: ITransactionConfig, ...args): ITransactionResult;
}