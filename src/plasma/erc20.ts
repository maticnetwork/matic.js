import BN from "bn.js";
import { ITransactionOption } from "../interfaces";
import { formatAmount, BaseToken, Web3SideChainClient } from "../utils";
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
        return this.processRead<string>(method, option);
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

    depositERC20(amount: BN | string | number, userAddress: string, option: ITransactionOption = {}) {
        const contract = this.depositManager.contract;
        const method = contract.method(
            "depositERC20ForUser",
            this.contract.address,
            userAddress,
            formatAmount(amount)
        );
        return this.processWrite(method, option);
    }

    depositEth(amount: BN | string | number, option: ITransactionOption = {}) {
        const contract = this.depositManager.contract;
        const method = contract.method(
            "depositEther",
        );
        return this.processWrite(method, option);
    }

}