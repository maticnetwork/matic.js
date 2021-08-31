import { Web3SideChainClient } from "../model";
import { ITransactionOption } from "../interfaces";
import { RootChainManager } from "./root_chain_manager";
import { formatAmount } from "../utils";
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
            tokenAddress,
            abi: client.getABI('ChildERC721', 'pos')
        }, client, rootChainManager, exitManager);
    }

    private validateMany_(tokenIds) {
        if (tokenIds.length > 20) {
            throw new Error('can not process more than 20 tokens');
        }
        return tokenIds.map(tokenId => {
            return formatAmount(tokenId);
        });
    }

    isApproved(tokenId: string, option?: ITransactionOption) {
        const contract = this.contract;
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
    }

    isApprovedAll(userAddress: string, option?: ITransactionOption) {
        const contract = this.contract;

        return this.getPredicateAddress().then(predicateAddress => {
            const method = contract.method(
                "isApprovedForAll",
                userAddress,
                predicateAddress
            );
            return this.processRead<boolean>(method, option);
        });

    }

    approve(tokenId: TYPE_AMOUNT, option?: ITransactionOption) {
        const contract = this.contract;
        return this.getPredicateAddress().then(predicateAddress => {
            const method = contract.method(
                "approve",
                predicateAddress,
                formatAmount(tokenId)
            );
            return this.processWrite(method, option);
        });
    }

    approveAll(option?: ITransactionOption) {
        const contract = this.contract;
        return this.getPredicateAddress().then(predicateAddress => {
            const method = contract.method(
                "setApprovalForAll",
                predicateAddress,
                true
            );
            return this.processWrite(method, option);
        });
    }


    deposit(tokenId: TYPE_AMOUNT, userAddress: string, option?: ITransactionOption) {
        const amountInABI = this.client.parent.encodeParameters(
            [formatAmount(tokenId)],
            ['uint256'],
        );
        return this.rootChainManager.deposit(
            userAddress,
            this.contractParam.tokenAddress,
            amountInABI,
            option
        );
    }

    depositMany(tokenIds: TYPE_AMOUNT[], userAddress: string, option?: ITransactionOption) {
        const tokensInUint256 = this.validateMany_(tokenIds);

        const amountInABI = this.client.parent.encodeParameters(
            tokensInUint256,
            ['uint256[]'],
        );
        return this.rootChainManager.deposit(
            userAddress,
            this.contractParam.tokenAddress,
            amountInABI,
            option
        );
    }

    withdrawStart(tokenId: TYPE_AMOUNT, option?: ITransactionOption) {
        const contract = this.contract;
        const method = contract.method(
            "withdraw",
            formatAmount(tokenId)
        );
        return this.processWrite(method, option);
    }

    withdrawStartMany(tokenIds: TYPE_AMOUNT[], option?: ITransactionOption) {
        const tokensInUint256 = this.validateMany_(tokenIds);
        const contract = this.contract;
        const method = contract.method(
            "withdrawBatch",
            tokensInUint256
        );
        return this.processWrite(method, option);
    }

    withdrawExit(burnTransactionHash: string, option?: ITransactionOption) {
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

}