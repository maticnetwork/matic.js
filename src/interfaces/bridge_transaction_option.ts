import { ITransactionOption } from "./transaction_option";

export interface IBridgeTransactionOption extends ITransactionOption {

    /**
     * address of spender 
     * 
     * **spender** - third-party user or a smart contract which can transfer your token on your behalf.
     *
     * @type {string}
     * @memberof IBridgeTransactionOption
     */
    permitData?: string;
    forceUpdateGlobalExitRoot?: boolean;
}
