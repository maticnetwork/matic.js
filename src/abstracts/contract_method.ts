import { ITransactionConfig, ITransactionWriteResult } from "../interfaces";
import { Logger } from "../utils";

export abstract class BaseContractMethod {
    constructor(public logger: Logger) {

    }
    abstract get address(): string;
    abstract read<T>(tx?: ITransactionConfig,): Promise<T>;
    abstract write(tx: ITransactionConfig,): ITransactionWriteResult;
    abstract estimateGas(tx: ITransactionConfig,): Promise<number>;
    abstract encodeABI(): any;
}