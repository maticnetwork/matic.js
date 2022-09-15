import { ITransactionRequestConfig, ITransactionWriteResult } from "../interfaces";
import { Logger } from "../utils";

export abstract class BaseContractMethod {
    constructor(public logger: Logger) {

    }
    abstract get address(): string;
    abstract read<T>(tx?: ITransactionRequestConfig, defaultBlock?: number | string): Promise<T>;
    abstract write(tx: ITransactionRequestConfig,): ITransactionWriteResult;
    abstract estimateGas(tx: ITransactionRequestConfig,): Promise<number>;
    abstract encodeABI(): any;
}