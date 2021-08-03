import { BaseToken, Web3SideChainClient } from "../model";
import BN from "bn.js";
import { ITransactionConfig, ITransactionOption } from "../interfaces";
import { formatAmount, IEventBusPromise, eventBusPromise, merge } from "../utils";
import { createTransactionConfig } from "../utils/create_tx_config";
import { DepositManager } from "./deposit_manager";

export class ERC20 extends BaseToken {

    constructor(
        tokenAddress: string,
        isParent: boolean,
        client: Web3SideChainClient,
        public depositManager: DepositManager) {
        super({
            isParent,
            tokenAddress,
            abi: client.getABI('ChildERC20')
        }, client);
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
        const method = contract.method(
            "approve",
            this.depositManager.contract.address,
            formatAmount(amount)
        );
        return this.processWrite(method, option);
    }

    approveMax(option: ITransactionOption = {}) {
        return this.approve(
            '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
            , option
        );
    }



}