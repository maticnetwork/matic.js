import { ITransactionConfig } from "./transaction_config";

export interface ITransactionResult {
	estimateGas(tx?: ITransactionConfig): Promise<number>;
	encodeABI(): string;
}