import { IPOSClientConfig, ITransactionOption } from "../interfaces";
import { Converter, promiseResolve, Web3SideChainClient } from "../utils";
import { POSToken } from "./pos_token";
import { Log_Event_Signature } from "../enums";
import { IPOSContracts, IPOSERC1155Address } from "../interfaces";
import { POSERC1155DepositBatchParam, POSERC1155DepositParam, POSERC1155TransferParam, TYPE_AMOUNT } from "..";

export class ERC1155 extends POSToken {

    mintablePredicateAddress: string;

    get addressConfig(): IPOSERC1155Address {
        return this.client.config.erc1155 || {};
    }

    constructor(
        tokenAddress: string,
        isParent: boolean,
        client: Web3SideChainClient<IPOSClientConfig>,
        getContracts: () => IPOSContracts
    ) {
        super({
            isParent,
            address: tokenAddress,
            name: 'ChildERC1155',
            bridgeType: 'pos'
        }, client, getContracts);

    }

    private getAddress_(value: string) {
        const addresses = this.addressConfig;
        if (addresses[value]) {
            return promiseResolve(addresses[value]);
        }

        return this.client.getConfig(value);
    }

    /**
     * get balance of a user for supplied token
     *
     * @param {string} userAddress
     * @param {TYPE_AMOUNT} tokenId
     * @param {ITransactionOption} [option]
     * @return {*} 
     * @memberof ERC1155
     */
    getBalance(userAddress: string, tokenId: TYPE_AMOUNT, option?: ITransactionOption) {
        return this.getContract().then(contract => {
            const method = contract.method(
                "balanceOf",
                userAddress,
                Converter.toHex(tokenId)
            );
            return this.processRead<string>(method, option);
        });
    }

    /**
     * check if a user is approved for all tokens
     *
     * @param {string} userAddress
     * @param {ITransactionOption} [option]
     * @return {*} 
     * @memberof ERC1155
     */
    isApprovedAll(userAddress: string, option?: ITransactionOption) {
        this.checkForRoot("isApprovedAll");

        return Promise.all([this.getContract(), this.getPredicateAddress()]).then(result => {
            const [contract, predicateAddress] = result;
            const method = contract.method(
                "isApprovedForAll",
                userAddress,
                predicateAddress
            );
            return this.processRead<boolean>(method, option);
        });

    }

    private approveAll_(predicateAddressPromise: Promise<string>, option: ITransactionOption) {
        this.checkForRoot("approve");

        return Promise.all([this.getContract(), predicateAddressPromise]).then(result => {
            const [contract, predicateAddress] = result;
            const method = contract.method(
                "setApprovalForAll",
                predicateAddress,
                true
            );
            return this.processWrite(method, option);
        });
    }

    /**
     * approve all tokens 
     *
     * @param {ITransactionOption} [option]
     * @return {*} 
     * @memberof ERC1155
     */
    approveAll(option?: ITransactionOption) {
        this.checkForRoot("approve");

        return this.approveAll_(
            this.getPredicateAddress(), option
        );
    }

    /**
     * approve all tokens for mintable token
     *
     * @param {ITransactionOption} [option]
     * @return {*} 
     * @memberof ERC1155
     */
    approveAllForMintable(option?: ITransactionOption) {
        this.checkForRoot("approveForMintable");
        const addressPath = "Main.POSContracts.MintableERC1155PredicateProxy";
        return this.approveAll_(
            this.getAddress_(addressPath), option
        );
    }

    /**
     * deposit supplied amount of token for a user 
     *
     * @param {POSERC1155DepositParam} param
     * @param {ITransactionOption} [option]
     * @return {*} 
     * @memberof ERC1155
     */
    deposit(param: POSERC1155DepositParam, option?: ITransactionOption) {
        this.checkForRoot("deposit");
        return this.depositMany({
            amounts: [param.amount],
            tokenIds: [param.tokenId],
            userAddress: param.userAddress,
            data: param.data
        }, option);
    }

    /**
     * deposit supplied amount of multiple token for user
     *
     * @param {POSERC1155DepositBatchParam} param
     * @param {ITransactionOption} [option]
     * @return {*} 
     * @memberof ERC1155
     */
    depositMany(param: POSERC1155DepositBatchParam, option?: ITransactionOption) {
        this.checkForRoot("depositMany");

        const { tokenIds, amounts, data, userAddress } = param;
        const emptyHex = Converter.toHex(0);
        const amountInABI = this.client.parent.encodeParameters(
            [
                tokenIds.map(t => Converter.toHex(t)),
                amounts.map(a => Converter.toHex(a)),
                data || emptyHex
            ],
            ['uint256[]', 'uint256[]', 'bytes'],
        );

        return this.rootChainManager.deposit(
            userAddress,
            this.contractParam.address,
            amountInABI,
            option
        );

    }

    /**
     * start withdraw process by burning the required amount for a token
     *
     * @param {string} tokenId
     * @param {TYPE_AMOUNT} amount
     * @param {ITransactionOption} [option]
     * @return {*} 
     * @memberof ERC1155
     */
    withdrawStart(tokenId: TYPE_AMOUNT, amount: TYPE_AMOUNT, option?: ITransactionOption) {
        this.checkForChild("withdrawStart");

        return this.getContract().then(contract => {
            const method = contract.method(
                "withdrawSingle",
                Converter.toHex(tokenId),
                Converter.toHex(amount)
            );
            return this.processWrite(method, option);
        });
    }

    /**
     * start the withdraw process by burning the supplied amount of multiple token at a time
     *
     * @param {TYPE_AMOUNT[]} tokenIds
     * @param {TYPE_AMOUNT[]} amounts
     * @param {ITransactionOption} [option]
     * @return {*} 
     * @memberof ERC1155
     */
    withdrawStartMany(tokenIds: TYPE_AMOUNT[], amounts: TYPE_AMOUNT[], option?: ITransactionOption) {
        this.checkForChild("withdrawStartMany");

        const tokensInHex = tokenIds.map(t => {
            return Converter.toHex(t);
        });
        const amountsInHex = amounts.map(t => {
            return Converter.toHex(t);
        });

        return this.getContract().then(contract => {
            const method = contract.method(
                "withdrawBatch",
                tokensInHex,
                amountsInHex
            );
            return this.processWrite(method, option);
        });
    }

    /**
     * exit the withdraw process and get the burned amount on root chain
     *
     * @param {string} burnTransactionHash
     * @param {ITransactionOption} [option]
     * @return {*} 
     * @memberof ERC1155
     */
    withdrawExit(burnTransactionHash: string, option?: ITransactionOption) {
        this.checkForRoot("withdrawExit");

        return this.withdrawExitPOS(
            burnTransactionHash,
            Log_Event_Signature.Erc1155Transfer,
            false,
            option
        );
    }

    /**
     * exit the withdraw process and get the burned amount on root chain
     * 
     * the process is faster because it uses proof api
     *
     * @param {string} burnTransactionHash
     * @param {ITransactionOption} [option]
     * @return {*} 
     * @memberof ERC1155
     */
    withdrawExitFaster(burnTransactionHash: string, option?: ITransactionOption) {
        this.checkForRoot("withdrawExitFaster");

        return this.withdrawExitPOS(
            burnTransactionHash,
            Log_Event_Signature.Erc1155Transfer,
            true,
            option
        );
    }

    /**
     * exit the withdraw process for many burned transaction and get the burned amount on root chain
     *
     * @param {string} burnTransactionHash
     * @param {ITransactionOption} [option]
     * @return {*} 
     * @memberof ERC1155
     */
    withdrawExitMany(burnTransactionHash: string, option?: ITransactionOption) {
        this.checkForRoot("withdrawExitMany");


        return this.withdrawExitPOS(
            burnTransactionHash,
            Log_Event_Signature.Erc1155BatchTransfer,
            false,
            option
        );
    }

    /**
     * exit the withdraw process for many burned transaction and get the burned amount on root chain
     *
     * the process is faster because it uses proof api
     * 
     * @param {string} burnTransactionHash
     * @param {ITransactionOption} [option]
     * @return {*} 
     * @memberof ERC1155
     */
    withdrawExitFasterMany(burnTransactionHash: string, option?: ITransactionOption) {
        this.checkForRoot("withdrawExitFasterMany");


        return this.withdrawExitPOS(
            burnTransactionHash,
            Log_Event_Signature.Erc1155BatchTransfer,
            true,
            option
        );
    }

    /**
     * check if exit has been completed for a transaction hash
     *
     * @param {string} burnTxHash
     * @return {*} 
     * @memberof ERC1155
     */
    isWithdrawExited(txHash: string) {
        return this.isWithdrawn(
            txHash, Log_Event_Signature.Erc1155Transfer
        );
    }

    /**
     * check if batch exit has been completed for a transaction hash
     *
     * @param {string} txHash
     * @return {*} 
     * @memberof ERC1155
     */
    isWithdrawExitedMany(txHash: string) {
        return this.isWithdrawn(
            txHash, Log_Event_Signature.Erc1155BatchTransfer
        );
    }

    /**
     * transfer the required amount of a token to anothe user
     *
     * @param {POSERC1155TransferParam} param
     * @param {ITransactionOption} [option]
     * @return {*} 
     * @memberof ERC1155
     */
    transfer(param: POSERC1155TransferParam, option?: ITransactionOption) {
        return this.transferERC1155(
            param, option
        );
    }
}