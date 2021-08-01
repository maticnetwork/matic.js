import { ITransactionConfig } from "./transaction_config";

export interface ITransactionOption extends ITransactionConfig {
    returnTransaction?: boolean;
}