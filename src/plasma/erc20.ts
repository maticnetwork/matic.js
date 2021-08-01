import { BaseToken, Web3SideChainClient } from "../model";
import BN from "bn.js";
import { ITransactionConfig, ITransactionOption } from "../interfaces";
import { formatAmount, IEventBusPromise, eventBusPromise } from "../utils";
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
        const result = eventBusPromise((res, rej) => {
            // tslint:disable-next-line
            this.createTransactionConfig(
                {
                    txConfig: option,
                    isWrite: true,
                    method,
                    isParent: true
                }).then(config => {
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