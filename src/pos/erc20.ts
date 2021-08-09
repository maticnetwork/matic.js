import { Web3SideChainClient } from "../model";
import { ITransactionOption } from "../interfaces";
import { createTransactionConfig } from "../utils/create_tx_config";
import { RootChainManager } from "./root_chain_manager";
import { formatAmount } from "../utils";
import { POSToken } from "./pos_token";
import { TYPE_AMOUNT } from "../types";

export class ERC20 extends POSToken {


    constructor(
        tokenAddress: string,
        isParent: boolean,
        client: Web3SideChainClient,
        rootChainManager: RootChainManager
    ) {
        super({
            isParent,
            tokenAddress,
            abi: client.getABI('ChildERC20', 'pos')
        }, client, rootChainManager);
    }



    getBalance(userAddress: string, option?: ITransactionOption) {
        const contract = this.contract;
        const method = contract.method(
            "balanceOf",
            userAddress
        );
        return createTransactionConfig(
            {
                txConfig: option,
                defaultTxConfig: this.childDefaultConfig,
            }).then(config => {
                return method.read<string>(config);
            });
    }

    approve(amount: TYPE_AMOUNT, option?: ITransactionOption) {
        const contract = this.contract;
        return this.getPredicateAddress().then(predicateAddress => {
            const method = contract.method(
                "approve",
                predicateAddress,
                formatAmount(amount)
            );
            return this.processWrite(method, option);
        });
    }

    approveMax(option?: ITransactionOption) {
        return this.approve(
            '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
            , option
        );
    }

    /**
     * initiate withdraw by burning provided amount
     *
     * @param {TYPE_AMOUNT} amount
     * @param {ITransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    withdrawStart(amount: TYPE_AMOUNT, option?: ITransactionOption) {
        const contract = this.contract;
        const method = contract.method(
            "withdraw",
            formatAmount(amount)
        );
        return this.processWrite(method, option);
    }

    withdrawExit(burnTransactionHash: string, option?: ITransactionOption) {
        
    }
}