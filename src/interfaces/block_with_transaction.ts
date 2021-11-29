import { IBlock, IBaseBlock } from "./block";
import { ITransactionData } from "./transaction_data";

export interface IBlockWithTransaction extends IBaseBlock {
    transactions: ITransactionData[];
}