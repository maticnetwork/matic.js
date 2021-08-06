import { BaseToken, Web3SideChainClient } from "../model";
import { ITransactionOption } from "../interfaces";
import { createTransactionConfig } from "../utils/create_tx_config";
import { RootChainManager } from "./root_chain_manager";
import BN from "bn.js";
import { formatAmount } from "../utils";
import { POSToken } from "./pos_token";

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

    approve(amount: BN | string | number, option: ITransactionOption = {}) {
        const contract = this.contract;
        return this.getPredicateAddress().then(predicateAddress => {
            const method = contract.method(
                "approve",
                this.predicateAddress,
                formatAmount(amount)
            );
            return this.processWrite(method, option);
        });
    }

    approveMax(option: ITransactionOption = {}) {
        return this.approve(
            '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
            , option
        );
    }
}