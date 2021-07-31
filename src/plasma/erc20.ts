import { BaseToken, Web3SideChainClient } from "@/model";
import BN from "bn.js";
import { ITransactionConfig } from "@/interfaces";
import { formatAmount, IEventBusPromise, eventBusPromise } from "../utils";
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
        console.log("arguments approve", arguments);
        const result = eventBusPromise((res, rej) => {
            // tslint:disable-next-line
            createTransactionConfig(
                {
                    txConfig,
                    defaultTxConfig: this.parentDefaultConfig,
                    client: this.client.parent.client,
                    isWrite: true,
                    method
                }).then(config => {
                    console.log("config", config);
                    const methodResult = method.write(
                        config,
                    );
                    methodResult.onTransactionHash = (txHash) => {
                        result.emit("txHash", txHash);
                    };
                    methodResult.onError = (err, receipt) => {
                        rej({
                            error: err,
                            receipt
                        });
                    };
                    methodResult.onReceipt = (receipt) => {
                        result.emit("receipt", receipt);
                        res(receipt);
                    };
                }) as IEventBusPromise<any>;
        });
        return result;

    }

}