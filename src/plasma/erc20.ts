import { TYPE_AMOUNT } from "../types";
import { Log_Event_Signature } from "../enums";
import { BaseContract } from "../abstracts";
import { IPlasmaContracts, ITransactionOption } from "../interfaces";
import { BaseToken, Converter, promiseResolve, Web3SideChainClient } from "../utils";
import { Erc20Predicate } from "./erc20_predicate";




export class ERC20 extends BaseToken {

    private predicate_: BaseContract;


    constructor(
        tokenAddress: string,
        isParent: boolean,
        client: Web3SideChainClient,
        private contracts_: IPlasmaContracts
    ) {
        super({
            isParent,
            address: tokenAddress,
            name: 'ChildERC20'
        }, client);
    }

    getPredicate(): Promise<BaseContract> {
        if (this.predicate_) {
            return promiseResolve(this.predicate_);
        }
        return this.contracts_.registry.getContract().then(contract => {
            return contract.method("erc20Predicate").read<string>();
        }).then(predicateAddress => {
            return new Erc20Predicate(this.client, predicateAddress).getContract();
        }).then(contract => {
            this.predicate_ = contract;
            return contract;
        });
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
        this.checkForParent("approve");
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
        this.checkForParent("deposit");

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
        this.checkForChild("withdrawStart");


        return this.getContract().then(tokenContract => {
            const method = tokenContract.method(
                "withdraw",
                Converter.toHex(amount)
            );
            return this.processWrite(method, option);
        });
    }

    private withdrawChallenge_(burnTxHash: string, isFast: boolean, option: ITransactionOption) {
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

    withdrawExit(option?: ITransactionOption) {
        return this.contracts_.withdrawManager.withdrawExit(
            this.contractParam.address, option
        );
    }

}