import { TYPE_AMOUNT } from "../types";
import { IPlasmaContracts, ITransactionOption } from "../interfaces";
import { Web3SideChainClient, Converter, BaseToken } from "../utils";
import { ERC20 } from "./erc20";

export class Ether extends BaseToken {


    constructor(
        isParent: boolean,
        client: Web3SideChainClient,
        private contracts_: IPlasmaContracts
    ) {

        super({
            isParent: true,
            address: null as any,
            name: null as any,
            bridgeType: null
        }, client);
    }

    getBalance(userAddress: string, option: ITransactionOption = {}) {
        option.from = userAddress;
        return this.readTransaction(option);
    }

    deposit(amount: TYPE_AMOUNT, option: ITransactionOption = {}) {
        return this.contracts_.depositManager.getContract().then(contract => {
            option.value = Converter.toHex(amount);
            const method = contract.method(
                "depositEther",
            );
            return this.processWrite(method, option);
        });
    }

    transfer(amount: TYPE_AMOUNT, to: string, option: ITransactionOption = {}) {
        const isParent = this.contractParam.isParent;
        if (isParent) {
            option.to = to;
            option.value = Converter.toHex(amount);
            return this.sendTransaction(option);
        }
        return this.contracts_.registry.getContract().then(contract => {
            return contract.method("getWethTokenAddress").read<string>();
        }).then(ethAddress => {
            const erc20 = new ERC20(
                ethAddress,
                isParent,
                this.client,
                this.contracts_
            );
            return erc20.transfer(to, amount);
        });
    }
}