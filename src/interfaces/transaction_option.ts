import { ITransactionConfig } from "./transaction_config";

export interface ITransactionOption extends ITransactionConfig {
    isParent?: boolean;
    returnTransaction?: boolean;
}