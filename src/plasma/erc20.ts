import { BaseToken, Web3SideChainClient } from "@/model";
import BN from "bn.js";
import { ITransactionConfig } from "@/interfaces";
import { formatAmount } from "@/utils";
import { createTransactionConfig } from "@/utils/create_tx_config";
import { DepositManager } from "./deposit_manager";

export class ERC20 extends BaseToken {

    constructor(client: Web3SideChainClient, abi: string,
        public depositManager: DepositManager) {
        super(client, abi);
    }

    getBalance(tokenAddress: string, userAddress: string, isParent?: boolean) {
        const contract = this.getContract(tokenAddress, isParent);
        const method = contract.method(
            "balanceOf",
            userAddress
        );
        return createTransactionConfig(
            {
                txConfig: {},
                defaultTxConfig: this.parentDefaultConfig,
            }).then(config => {
                console.log("config", config);
                return method.read<string>(config);
            });
    }

    approve(tokenAddress: string, amount: BN | string | number, txConfig: ITransactionConfig = {}) {
        const contract = this.getContract(tokenAddress, true);
        const methodName = "approve";
        const method = contract.method(
            methodName,
            this.depositManager.contract.address,
            formatAmount(amount)
        );
        return createTransactionConfig(
            {
                txConfig,
                defaultTxConfig: this.parentDefaultConfig,
                client: this.client.parent.client,
                isWrite: true,
                method
            }).then(config => {
                return method.write(
                    config,
                );
            });
    }

}