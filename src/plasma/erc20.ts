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
        return contract.read<string>("balanceOf", null, userAddress);
    }

    approve(tokenAddress: string, amount: BN | string | number, txConfig?: ITransactionConfig) {
        const contract = this.getContract(tokenAddress, true);
        const methodName = "approve";
        return createTransactionConfig(txConfig, {},
            contract.createTransaction(methodName),
            this.client.parent.client
        ).then(config => {
            return contract.write(
                "approve",
                config,
                this.depositManager.contract.address,
                formatAmount(amount)
            );
        });
    }

}