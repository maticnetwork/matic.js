import { TYPE_AMOUNT } from "../types";
import { Log_Event_Signature } from "../enums";
import { IPlasmaContracts, ITransactionOption } from "../interfaces";
import { BaseToken, Converter, promiseResolve, Web3SideChainClient } from "../utils";
import { PlasmaToken } from "./plasma_token";
import { MATIC_TOKEN_ADDRESS_ON_POLYGON } from "../constant";

export class ERC20 extends PlasmaToken {

    constructor(
        tokenAddress: string,
        isParent: boolean,
        client: Web3SideChainClient,
        contracts: IPlasmaContracts
    ) {
        super({
            isParent,
            address: tokenAddress,
            name: 'ChildERC20'
        }, client, contracts);
    }

    getPredicate() {
        return this['getPredicate_'](
            "erc20Predicate", "ERC20Predicate"
        );
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

    approve(amount: TYPE_AMOUNT, option: ITransactionOption = {}) {
        this.checkForRoot_("approve");
        return this.getContract().then(contract => {
            const method = contract.method(
                "approve",
                this.contracts_.depositManager.address,
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

    deposit(amount: TYPE_AMOUNT, userAddress: string, option: ITransactionOption = {}) {
        this.checkForRoot_("deposit");

        return this.contracts_.depositManager.getContract().then(contract => {
            const method = contract.method(
                "depositERC20ForUser",
                this.contractParam.address,
                userAddress,
                Converter.toHex(amount)
            );
            return this.processWrite(method, option);
        });
    }

    withdrawStart(amount: TYPE_AMOUNT, option?: ITransactionOption) {
        this.checkForChild_("withdrawStart");


        return this.getContract().then(tokenContract => {
            const method = tokenContract.method(
                "withdraw",
                Converter.toHex(amount)
            );
            return this.processWrite(method, option);
        });
    }

    private withdrawChallenge_(burnTxHash: string, isFast: boolean, option: ITransactionOption) {
        this.checkForRoot_("withdrawChallenge");

        return Promise.all([
            this.getPredicate(),
            this.contracts_.exitManager.buildPayloadForExit(
                burnTxHash,
                Log_Event_Signature.PlasmaErc20WithdrawEventSig,
                isFast
            )
        ]).then(result => {
            const [predicate, payload] = result;
            const method = predicate.method(
                "startExitWithBurntTokens",
                payload
            );
            return this.processWrite(method, option);
        });
    }

    withdrawChallenge(burnTxHash: string, option?: ITransactionOption) {
        return this.withdrawChallenge_(burnTxHash, false, option);
    }

    withdrawChallengeFaster(burnTxHash: string, option?: ITransactionOption) {
        return this.withdrawChallenge_(burnTxHash, true, option);
    }

    transfer(to: string, amount: TYPE_AMOUNT, option: ITransactionOption = {}) {
        if (this.contractParam.address === MATIC_TOKEN_ADDRESS_ON_POLYGON) {
            option.to = to;
        }
        return this.transferERC20_(to, amount, option);
    }


}