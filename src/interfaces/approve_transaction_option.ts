import { ITransactionOption } from "./transaction_option";

export interface IApproveTransactionOption extends ITransactionOption {

    /**
     * address of spender 
     * 
     * **spender** - third-party user or a smart contract which can transfer your token on your behalf.
     *
     * @type {string}
     * @memberof IAllowanceTransactionOption
     */
    spenderAddress?: string;
    forceUpdateGlobalExitRoot?: boolean;
}