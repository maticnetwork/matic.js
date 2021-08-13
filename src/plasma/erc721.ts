import { BaseToken, Web3SideChainClient } from "../model";
import BN from "bn.js";
import { ITransactionConfig, ITransactionOption } from "../interfaces";
import { formatAmount, IEventBusPromise, eventBusPromise, merge } from "../utils";
import { createTransactionConfig } from "../utils/create_tx_config";
import { DepositManager } from "./deposit_manager";

export class ERC721 extends BaseToken {

    constructor(
        tokenAddress: string,
        isParent: boolean,
        client: Web3SideChainClient,
        public depositManager: DepositManager
    ) {
        super({
            isParent,
            tokenAddress,
            abi: client.getABI('ChildERC721')
        }, client);
    }

    /**
     * READ
     * how many ERC721s are owned by this user
     * 
     * @param userAddress 
     * @param option 
     */
    getBalance(userAddress: string, option: ITransactionOption = {}) {
        const contract = this.contract;
        const method = contract.method(
            "balanceOf",
            userAddress
        );

        return createTransactionConfig(
            {
                txConfig: {},
                defaultTxConfig: this.childDefaultConfig,
            }).then(config => {
                return method.read<string>(config);
            });
    }

}
