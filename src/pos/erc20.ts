import { ITransactionOption } from "../interfaces";
import { RootChainManager } from "./root_chain_manager";
import { Converter, Web3SideChainClient } from "../utils";
import { POSToken } from "./pos_token";
import { TYPE_AMOUNT } from "../types";
import { ExitManager } from "./exit_manager";
import { Log_Event_Signature, ERROR_TYPE } from "../enums";

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
            address: tokenAddress,
            name: 'ChildERC20',
            bridgeType: 'pos'
        }, client, rootChainManager, exitManager);
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

    approve(amount: TYPE_AMOUNT, option?: ITransactionOption) {
        if (!this.contractParam.isParent) {
            this.client.logger.error(ERROR_TYPE.AllowedOnRoot, "approve").throw();
        }
        return Promise.all([this.getPredicateAddress(), this.getContract()]).then(result => {
            const [predicateAddress, contract] = result;
            const method = contract.method(
                "approve",
                predicateAddress,
                Converter.toHex(amount)
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
        if (!this.contractParam.isParent) {
            this.client.logger.error(ERROR_TYPE.AllowedOnRoot, "deposit").throw();
        }

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

    /**
     * initiate withdraw by burning provided amount
     *
     * @param {TYPE_AMOUNT} amount
     * @param {ITransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    withdrawStart(amount: TYPE_AMOUNT, option?: ITransactionOption) {
        if (this.contractParam.isParent) {
            this.client.logger.error(ERROR_TYPE.AllowedOnChild, "withdrawStart").throw();
        }

        return this.getContract().then(contract => {
            const method = contract.method(
                "withdraw",
                Converter.toHex(amount)
            );
            return this.processWrite(method, option);
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
    withdrawExit(burnTransactionHash: string, option?: ITransactionOption) {
        if (!this.contractParam.isParent) {
            this.client.logger.error(ERROR_TYPE.AllowedOnRoot, "withdrawExit").throw();
        }

        return this.exitManager.buildPayloadForExit(
            burnTransactionHash,
            Log_Event_Signature.Erc20Transfer,
            false
        ).then(payload => {
            return this.rootChainManager.exit(
                payload, option
            );
        });
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
        if (!this.contractParam.isParent) {
            this.client.logger.error(ERROR_TYPE.AllowedOnRoot, "withdrawExitFaster").throw();
        }

        return this.exitManager.buildPayloadForExit(
            burnTransactionHash,
            Log_Event_Signature.Erc20Transfer,
            true
        ).then(payload => {
            return this.rootChainManager.exit(
                payload, option
            );
        });
    }

    /**
     * check if exit has been completed for a transaction hash
     *
     * @param {string} txHash
     * @returns
     * @memberof ERC20
     */
    isWithdrawExited(txHash: string) {
        if (!txHash) {
            throw new Error(`txHash not provided`);
        }
        return this.exitManager.getExitHash(
            txHash, Log_Event_Signature.Erc20Transfer
        ).then(exitHash => {
            return this.rootChainManager.isExitProcessed(
                exitHash
            );
        });
    }

}