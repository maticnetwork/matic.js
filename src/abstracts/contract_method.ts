import { ITransactionConfig, ISendResult } from "../interfaces";
import { Logger } from "../utils";

export abstract class BaseContractMethod {
    constructor(public logger: Logger) {

    }
    abstract read<T>(tx?: ITransactionConfig,): Promise<T>;
    abstract write(tx: ITransactionConfig,): ISendResult;
    abstract estimateGas(tx: ITransactionConfig,): Promise<number>;
    abstract encodeABI(): any;
}