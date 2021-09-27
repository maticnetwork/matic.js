import BN from "bn.js";
import { ITransactionOption } from "../interfaces";
import { BaseToken, Converter, Web3SideChainClient } from "../utils";
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
            tokenContractName: 'ChildERC20'
        }, client);
    }

    getBalance(userAddress: string, option: ITransactionOption = {}) {
        return this.getContract().then(contract => {
            const method = contract.method(
                "balanceOf",
                userAddress
            );
            return this.processRead<string>(method, option);
        });
    }

    approve(amount: BN | string | number, option: ITransactionOption = {}) {
        return this.getContract().then(contract => {
            const method = contract.method(
                "approve",
                this.depositManager.contract.address,
                Converter.toHex(amount)
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

    deposit(amount: BN | string | number, userAddress: string, option: ITransactionOption = {}) {
        return this.getContract().then(tokenContract => {
            const contract = this.depositManager.contract;
            const method = contract.method(
                "depositERC20ForUser",
                tokenContract.address,
                userAddress,
                Converter.toHex(amount)
            );
            return this.processWrite(method, option);
        });
    }
}