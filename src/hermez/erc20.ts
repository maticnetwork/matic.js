import { ITransactionOption } from "../interfaces";
import { Converter, Web3SideChainClient } from "../utils";
import { HermezToken } from "./hermez_token";
import { TYPE_AMOUNT } from "../types";
import { MAX_AMOUNT } from "..";
import { IAllowanceTransactionOption, IApproveTransactionOption, IBridgeTransactionOption, IHermezClientConfig, IHermezContracts } from "../interfaces";

export class ERC20 extends HermezToken {

    constructor(
        tokenAddress: string,
        isParent: boolean,
        client: Web3SideChainClient<IHermezClientConfig>,
        getContracts: () => IHermezContracts
    ) {
        super({
            isParent,
            address: tokenAddress,
            name: 'ChildERC20',
            bridgeType: 'hermez'
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
        const spenderAddress = option.spenderAddress ? option.spenderAddress : (
            this.contractParam.isParent ? this.parentBridge : this.childBridge);

        return this.getContract().then(contract => {
            const method = contract.method(
                "allowance",
                userAddress,
                spenderAddress,
            );
            return this.processRead<string>(method, option);
        });
    }

    approve(amount: TYPE_AMOUNT, option: IApproveTransactionOption = {}) {
        const spenderAddress = option.spenderAddress ? option.spenderAddress : (
            this.contractParam.isParent ? this.parentBridge : this.childBridge);

        return this.getContract().then(contract => {
            const method = contract.method(
                "approve",
                spenderAddress,
                Converter.toHex(amount)
            );
            return this.processWrite(method, option);
        });
    }

    approveMax(option: IApproveTransactionOption = {}) {
        return this.approve(
            MAX_AMOUNT,
            option
        );
    }

    /**
     * Deposit given amount of token for user
     *
     * @param {TYPE_AMOUNT} amount
     * @param {string} userAddress
     * @param {IBridgeTransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    deposit(amount: TYPE_AMOUNT, userAddress: string, option?: IBridgeTransactionOption) {
        this.checkForRoot("deposit");
        const permitData = option.permitData || '0x';

        const amountInABI = this.client.parent.encodeParameters(
            [Converter.toHex(amount)],
            ['uint256'],
        );

        return this.childBridge.networkID().then(networkId => {
            return this.parentBridge.bridgeAsset(
                this.contractParam.address,
                networkId,
                userAddress,
                amountInABI,
                permitData,
                option
            );
        })
    }

    /**
     * Complete deposit after GlobalExitRootManager is synced from Parent to root
     *
     * @param {string} transactionHash
     * @param {ITransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    depositClaim(transactionHash: string, option?: ITransactionOption) {
        this.checkForChild("depositClaim");
        return this.parentBridge.networkID().then(networkId => {
            return this.bridgeUtil.buildPayloadForClaim(
                transactionHash, true, networkId
            )
        }).then(payload => {
            return this.childBridge.claimAsset(
                payload.smtProof,
                payload.index,
                payload.mainnetExitRoot,
                payload.rollupExitRoot,
                payload.originNetwork,
                payload.originTokenAddress,
                payload.destinationNetwork,
                payload.destinationAddress,
                payload.amount,
                payload.metadata,
                option
            )
        })
    }

    /**
     * initiate withdraw by burning provided amount
     *
     * @param {TYPE_AMOUNT} amount
     * @param {string} userAddress
     * @param {IBridgeTransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    withdraw(amount: TYPE_AMOUNT, userAddress: string, option?: IBridgeTransactionOption) {
        this.checkForChild("withdraw");
        const permitData = option.permitData || '0x';

        const amountInABI = this.client.parent.encodeParameters(
            [Converter.toHex(amount)],
            ['uint256'],
        );

        return this.parentBridge.networkID().then(networkId => {
            return this.childBridge.bridgeAsset(
                this.contractParam.address,
                networkId,
                userAddress,
                amountInABI,
                permitData,
                option
            );
        })
    }

    /**
     * Complete deposit after GlobalExitRootManager is synced from Parent to root
     *
     * @param {string} burnTransactionHash
     * @param {ITransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    exit(burnTransactionHash: string, option?: ITransactionOption) {
        this.checkForRoot("exit");
        return this.childBridge.networkID().then(networkId => {
            return this.bridgeUtil.buildPayloadForClaim(
                burnTransactionHash, false, networkId
            )
        }).then(payload => {
            return this.parentBridge.claimAsset(
                payload.smtProof,
                payload.index,
                payload.mainnetExitRoot,
                payload.rollupExitRoot,
                payload.originNetwork,
                payload.originTokenAddress,
                payload.destinationNetwork,
                payload.destinationAddress,
                payload.amount,
                payload.metadata,
                option
            )
        })
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
