import { Web3SideChainClient } from "../model";
import { ITransactionOption } from "../interfaces";
import { createTransactionConfig } from "../utils/create_tx_config";
import { RootChainManager } from "./root_chain_manager";
import { formatAmount } from "../utils";
import { POSToken } from "./pos_token";
import { TYPE_AMOUNT } from "../types";
import { ExitManager } from "./exit_manager";
import { Log_Event_Signature } from "../enums";

export class ERC20 extends POSToken {


    constructor(
        tokenAddress: string,
        isParent: boolean,
        client: Web3SideChainClient,
        rootChainManager: RootChainManager,
        exitManager: ExitManager
    ) {
        super({
            isParent,
            tokenAddress,
            abi: client.getABI('ChildERC20', 'pos')
        }, client, rootChainManager, exitManager);
    }

    getBalance(userAddress: string, option?: ITransactionOption) {
        const contract = this.contract;
        const method = contract.method(
            "balanceOf",
            userAddress
        );
        return createTransactionConfig(
            {
                txConfig: option,
                defaultTxConfig: this.childDefaultConfig,
            }).then(config => {
                return method.read<string>(config);
            });
    }

    approve(amount: TYPE_AMOUNT, option?: ITransactionOption) {
        const contract = this.contract;
        return this.getPredicateAddress().then(predicateAddress => {
            const method = contract.method(
                "approve",
                predicateAddress,
                formatAmount(amount)
            );
            return this.processWrite(method, option);
        });
    }

    approveMax(option?: ITransactionOption) {
        return this.approve(
            '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
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
        console.log("this.rootChainManager", this.rootChainManager['contract'].address);
        const amountInABI = this.client.parent.client.encodeParameters(
            [formatAmount(amount)],
            ['uint256'],
        );
        console.log("amountInByte", amountInABI);
        return this.rootChainManager.deposit(
            userAddress,
            this.contractParam.tokenAddress,
            amountInABI,
            option
        );
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
        const contract = this.contract;
        const method = contract.method(
            "withdraw",
            formatAmount(amount)
        );
        return this.processWrite(method, option);
    }

    /**
     * complete withdraw process after checkpoint has been submitted for the block containing burn tx.
     *
     * @param {string} burnTransactionHash
     * @param {ITransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    withdrawExit(burnTransactionHash: string, option?: ITransactionOption) {
        return this.exitManager.exit(
            burnTransactionHash,
            Log_Event_Signature.Erc20Transfer,
            option
        );
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
    withdrawExitFaster(burnTransactionHash: string, option?: ITransactionOption) {
        return this.exitManager.exitFast(
            burnTransactionHash,
            Log_Event_Signature.Erc20Transfer,
            option
        );
    }

    /**
     * check if exit has been completed for a transaction hash
     *
     * @param {string} txHash
     * @returns
     * @memberof ERC20
     */
    isExited(txHash: string) {
        if (!txHash) {
            throw new Error(`txHash not provided`);
        }
        return this.exitManager.isExitProcessed(
            txHash, Log_Event_Signature.Erc20Transfer
        );
    }


}