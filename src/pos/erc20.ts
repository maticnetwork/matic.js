import { ITransactionOption } from "../interfaces";
import { Converter, Web3SideChainClient } from "../utils";
import { POSToken } from "./pos_token";
import { TYPE_AMOUNT } from "../types";
import { ERROR_TYPE, Log_Event_Signature } from "../enums";
import { MAX_AMOUNT, promiseResolve } from "..";
import { IAllowanceTransactionOption, IApproveTransactionOption, IExitTransactionOption, IPOSClientConfig, IPOSContracts } from "../interfaces";

export class ERC20 extends POSToken {

    constructor(
        tokenAddress: string,
        isParent: boolean,
        client: Web3SideChainClient<IPOSClientConfig>,
        getContracts: () => IPOSContracts
    ) {
        super({
            isParent,
            address: tokenAddress,
            name: 'ChildERC20',
            bridgeType: 'pos'
        }, client, getContracts);
    }

    getBalance(userAddress: string, option?: ITransactionOption) {
        return this.getContract().then(contract => {
            const method = contract.method(
                "balanceOf",
                userAddress
            );
            return this.processRead<string>(method, option);
        });
    }

    /**
     * get allowance of user
     *
     * @param {string} userAddress
     * @param {ITransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    getAllowance(userAddress: string, option: IAllowanceTransactionOption = {}) {
        const spenderAddress = option.spenderAddress;

        const predicatePromise = spenderAddress ? promiseResolve(spenderAddress) : this.getPredicateAddress();

        return Promise.all([predicatePromise, this.getContract()]).then(result => {
            const [predicateAddress, contract] = result;
            const method = contract.method(
                "allowance",
                userAddress,
                predicateAddress,
            );
            return this.processRead<string>(method, option);
        });
    }

    approve(amount: TYPE_AMOUNT, option: IApproveTransactionOption = {}) {
        const spenderAddress = option.spenderAddress;

        if (!spenderAddress && !this.contractParam.isParent) {
            this.client.logger.error(ERROR_TYPE.NullSpenderAddress).throw();
        }

        const predicatePromise = spenderAddress ? promiseResolve(spenderAddress) : this.getPredicateAddress();

        return Promise.all([predicatePromise, this.getContract()]).then(result => {
            const [predicateAddress, contract] = result;
            const method = contract.method(
                "approve",
                predicateAddress,
                Converter.toHex(amount)
            );
            return this.processWrite(method, option);
        });
    }

    approveMax(option: IApproveTransactionOption = {}) {
        return this.approve(
            MAX_AMOUNT
            , option
        );
    }

    /**
     * Deposit given amount of token for user
     *
     * @param {TYPE_AMOUNT} amount
     * @param {string} userAddress
     * @param {ITransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    deposit(amount: TYPE_AMOUNT, userAddress: string, option?: ITransactionOption) {
        this.checkForRoot("deposit");

        const amountInABI = this.client.parent.encodeParameters(
            [Converter.toHex(amount)],
            ['uint256'],
        );
        return this.rootChainManager.deposit(
            userAddress,
            this.contractParam.address,
            amountInABI,
            option
        );
    }

    private depositEther_(amount: TYPE_AMOUNT, userAddress: string, option: ITransactionOption = {}) {
        this.checkForRoot("depositEther");


        option.value = Converter.toHex(amount);
        return this.rootChainManager.method("depositEtherFor", userAddress).then(method => {
            return this.processWrite(method, option);
        });
    }

    /**
     * initiate withdraw by burning provided amount
     *
     * @param {TYPE_AMOUNT} amount
     * @param {ITransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    withdrawStart(amount: TYPE_AMOUNT, option?: ITransactionOption) {
        this.checkForChild("withdrawStart");


        return this.getContract().then(contract => {
            const method = contract.method(
                "withdraw",
                Converter.toHex(amount)
            );
            return this.processWrite(method, option);
        });
    }

    private withdrawExit_(burnTransactionHash: string, isFast: boolean, option: IExitTransactionOption = {}) {
        const eventSignature = option.burnEventSignature ?
            option.burnEventSignature : Log_Event_Signature.Erc20Transfer;

        return this.exitUtil.buildPayloadForExit(
            burnTransactionHash,
            eventSignature,
            isFast
        ).then(payload => {
            return this.rootChainManager.exit(
                payload, option
            );
        });
    }

    /**
     * complete withdraw process after checkpoint has been submitted for the block containing burn tx.
     *
     * @param {string} burnTransactionHash
     * @param {ITransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    withdrawExit(burnTransactionHash: string, option?: IExitTransactionOption) {
        this.checkForRoot("withdrawExit");

        return this.withdrawExit_(burnTransactionHash, false, option);
    }

    /**
     * complete withdraw process after checkpoint has been submitted for the block containing burn tx.
     *
     *  Note:- It create the proof in api call for fast exit.
     * 
     * @param {string} burnTransactionHash
     * @param {ITransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    withdrawExitFaster(burnTransactionHash: string, option?: IExitTransactionOption) {
        this.checkForRoot("withdrawExitFaster");

        return this.withdrawExit_(burnTransactionHash, true, option);
    }

    /**
     * check if exit has been completed for a transaction hash
     *
     * @param {string} burnTxHash
     * @returns
     * @memberof ERC20
     */
    isWithdrawExited(burnTxHash: string) {
        return this.isWithdrawn(burnTxHash, Log_Event_Signature.Erc20Transfer);
    }

    /**
     * transfer amount to another user
     *
     * @param {TYPE_AMOUNT} amount
     * @param {string} to
     * @param {ITransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    transfer(amount: TYPE_AMOUNT, to: string, option?: ITransactionOption) {
        return this.transferERC20(to, amount, option);
    }

}
