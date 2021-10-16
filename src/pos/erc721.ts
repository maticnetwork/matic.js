import { ITransactionOption } from "../interfaces";
import { RootChainManager } from "./root_chain_manager";
import { Converter, Web3SideChainClient } from "../utils";
import { POSToken } from "./pos_token";
import { TYPE_AMOUNT } from "../types";
import { ExitManager } from "./exit_manager";
import { Log_Event_Signature } from "../enums";

export class ERC721 extends POSToken {


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
            name: 'ChildERC721',
            bridgeType: 'pos'
        }, client, rootChainManager, exitManager);
    }

    private validateMany__(tokenIds) {
        if (tokenIds.length > 20) {
            throw new Error('can not process more than 20 tokens');
        }
        return tokenIds.map(tokenId => {
            return Converter.toHex(tokenId);
        });
    }

    /**
     * get tokens count for the user
     *
     * @param {string} userAddress
     * @param {ITransactionOption} [options]
     * @returns
     * @memberof ERC721
     */
    getTokensCount(userAddress: string, options?: ITransactionOption) {
        return this.getContract().then(contract => {
            const method = contract.method(
                "balanceOf",
                userAddress
            );
            return this.processRead<number>(method, options);
        });
    }

    /**
     * returns token id on supplied index for user
     *
     * @param {number} index
     * @param {string} userAddress
     * @param {ITransactionOption} [options]
     * @returns
     * @memberof ERC721
     */
    getTokenIdAtIndexForUser(index: number, userAddress: string, options?: ITransactionOption) {
        return this.getContract().then(contract => {
            const method = contract.method(
                "tokenOfOwnerByIndex",
                userAddress,
                index
            );

            return this.processRead<string>(method, options);
        });
    }

    /**
     * get all tokens for user
     *
     * @param {string} userAddress
     * @param {*} [limit=Infinity]
     * @returns
     * @memberof ERC721
     */
    getAllTokens(userAddress: string, limit = Infinity) {
        return this.getTokensCount(userAddress).then(count => {
            count = Number(count);
            if (count > limit) {
                count = limit;
            }
            const promises = [];
            for (let i = 0; i < count; i++) {
                promises.push(
                    this.getTokenIdAtIndexForUser(i, userAddress)
                );
            }
            return Promise.all(
                promises
            );
        });
    }

    isApproved(tokenId: string, option?: ITransactionOption) {
        this.checkForRoot_("isApproved");

        return this.getContract().then(contract => {
            const method = contract.method(
                "getApproved",
                tokenId
            );
            return Promise.all([
                this.processRead<string>(method, option),
                this.getPredicateAddress()
            ]).then(result => {
                return result[0] === result[1];
            });
        });
    }

    isApprovedAll(userAddress: string, option?: ITransactionOption) {
        this.checkForRoot_("isApprovedAll");

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

    approve(tokenId: TYPE_AMOUNT, option?: ITransactionOption) {
        this.checkForRoot_("approve");

        return Promise.all([this.getContract(), this.getPredicateAddress()]).then(result => {
            const [contract, predicateAddress] = result;
            const method = contract.method(
                "approve",
                predicateAddress,
                Converter.toHex(tokenId)
            );
            return this.processWrite(method, option);
        });
    }

    approveAll(option?: ITransactionOption) {
        this.checkForRoot_("approveAll");

        return Promise.all([this.getContract(), this.getPredicateAddress()]).then(result => {
            const [contract, predicateAddress] = result;
            const method = contract.method(
                "setApprovalForAll",
                predicateAddress,
                true
            );
            return this.processWrite(method, option);
        });
    }


    deposit(tokenId: TYPE_AMOUNT, userAddress: string, option?: ITransactionOption) {
        this.checkForRoot_("deposit");

        const amountInABI = this.client.parent.encodeParameters(
            [Converter.toHex(tokenId)],
            ['uint256'],
        );
        return this.rootChainManager.deposit(
            userAddress,
            this.contractParam.address,
            amountInABI,
            option
        );
    }

    depositMany(tokenIds: TYPE_AMOUNT[], userAddress: string, option?: ITransactionOption) {
        this.checkForRoot_("depositMany");

        const tokensInUint256 = this.validateMany__(tokenIds);

        const amountInABI = this.client.parent.encodeParameters(
            tokensInUint256,
            ['uint256[]'],
        );
        return this.rootChainManager.deposit(
            userAddress,
            this.contractParam.address,
            amountInABI,
            option
        );
    }

    withdrawStart(tokenId: TYPE_AMOUNT, option?: ITransactionOption) {
        this.checkForChild_("withdrawStart");


        return this.getContract().then(contract => {
            const method = contract.method(
                "withdraw",
                Converter.toHex(tokenId)
            );
            return this.processWrite(method, option);
        });
    }

    withdrawStartMany(tokenIds: TYPE_AMOUNT[], option?: ITransactionOption) {
        this.checkForChild_("withdrawStartMany");


        const tokensInUint256 = this.validateMany__(tokenIds);
        return this.getContract().then(contract => {
            const method = contract.method(
                "withdrawBatch",
                tokensInUint256
            );
            return this.processWrite(method, option);
        });
    }

    withdrawExit(burnTransactionHash: string, option?: ITransactionOption) {
        this.checkForRoot_("withdrawExit");


        return this.exitManager.buildPayloadForExit(
            burnTransactionHash,
            Log_Event_Signature.Erc721Transfer,
            false
        ).then(payload => {
            return this.rootChainManager.exit(
                payload, option
            );
        });
    }

    withdrawExitMany(burnTransactionHash: string, option?: ITransactionOption) {
        this.checkForRoot_("withdrawExitMany");


        return this.exitManager.buildPayloadForExit(
            burnTransactionHash,
            Log_Event_Signature.Erc721BatchTransfer,
            false
        ).then(payload => {
            return this.rootChainManager.exit(
                payload, option
            );
        });
    }

    withdrawExitFaster(burnTransactionHash: string, option?: ITransactionOption) {
        this.checkForRoot_("withdrawExitFaster");


        return this.exitManager.buildPayloadForExit(
            burnTransactionHash,
            Log_Event_Signature.Erc721Transfer,
            true
        ).then(payload => {
            return this.rootChainManager.exit(
                payload, option
            );
        });
    }

    withdrawExitFasterMany(burnTransactionHash: string, option?: ITransactionOption) {
        this.checkForRoot_("withdrawExitFasterMany");


        return this.exitManager.buildPayloadForExit(
            burnTransactionHash,
            Log_Event_Signature.Erc721BatchTransfer,
            true
        ).then(payload => {
            return this.rootChainManager.exit(
                payload, option
            );
        });
    }

    isExited(txHash: string) {
        if (!txHash) {
            throw new Error(`txHash not provided`);
        }
        return this.exitManager.getExitHash(
            txHash, Log_Event_Signature.Erc721Transfer
        ).then(exitHash => {
            return this.rootChainManager.isExitProcessed(
                exitHash
            );
        });
    }

    isExitedMany(txHash: string) {
        if (!txHash) {
            throw new Error(`txHash not provided`);
        }
        return this.exitManager.getExitHash(
            txHash, Log_Event_Signature.Erc721BatchTransfer
        ).then(exitHash => {
            return this.rootChainManager.isExitProcessed(
                exitHash
            );
        });
    }

    /**
     * tranfer to another user
     *
     * @param {string} tokenId
     * @param {string} from
     * @param {string} to
     * @param {ITransactionOption} [option]
     * @returns
     * @memberof ERC721
     */
    transfer(tokenId: string, from: string, to: string, option?: ITransactionOption) {
        return this.transferERC721_(
            from,
            to,
            tokenId,
            option
        );
    }

}