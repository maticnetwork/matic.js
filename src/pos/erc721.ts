import { IPOSClientConfig, IPOSContracts, ITransactionOption } from "../interfaces";
import { RootChainManager } from "./root_chain_manager";
import { Converter, Web3SideChainClient } from "../utils";
import { POSToken } from "./pos_token";
import { TYPE_AMOUNT } from "../types";
import { ExitUtil } from "./exit_util";
import { Log_Event_Signature } from "../enums";

export class ERC721 extends POSToken {


    constructor(
        tokenAddress: string,
        isParent: boolean,
        client: Web3SideChainClient<IPOSClientConfig>,
        getContracts: () => IPOSContracts
    ) {
        super({
            isParent,
            address: tokenAddress,
            name: 'ChildERC721',
            bridgeType: 'pos'
        }, client, getContracts);
    }

    private validateMany_(tokenIds) {
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
            return this.processRead<string>(method, options);
        }).then(count => {
            return Number(count);
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
        this.checkForRoot("isApproved");

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

    approve(tokenId: TYPE_AMOUNT, option?: ITransactionOption) {
        this.checkForRoot("approve");

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
        this.checkForRoot("approveAll");

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
        this.checkForRoot("deposit");

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
        this.checkForRoot("depositMany");

        const tokensInHex = this.validateMany_(tokenIds);

        const amountInABI = this.client.parent.encodeParameters(
            [tokensInHex],
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
        this.checkForChild("withdrawStart");


        return this.getContract().then(contract => {
            const method = contract.method(
                "withdraw",
                Converter.toHex(tokenId)
            );
            return this.processWrite(method, option);
        });
    }

    withdrawStartWithMetaData(tokenId: TYPE_AMOUNT, option?: ITransactionOption) {
        this.checkForChild("withdrawStartWithMetaData");


        return this.getContract().then(contract => {
            const method = contract.method(
                "withdrawWithMetadata",
                Converter.toHex(tokenId)
            );
            return this.processWrite(method, option);
        });
    }

    withdrawStartMany(tokenIds: TYPE_AMOUNT[], option?: ITransactionOption) {
        this.checkForChild("withdrawStartMany");

        const tokensInHex = this.validateMany_(tokenIds);

        return this.getContract().then(contract => {
            const method = contract.method(
                "withdrawBatch",
                tokensInHex
            );
            return this.processWrite(method, option);
        });
    }

    withdrawExit(burnTransactionHash: string, option?: ITransactionOption) {
        this.checkForRoot("withdrawExit");

        return this.exitUtil.buildPayloadForExit(
            burnTransactionHash,
            Log_Event_Signature.Erc721Transfer,
            false
        ).then(payload => {
            return this.rootChainManager.exit(
                payload, option
            );
        });
    }

    withdrawExitOnIndex(burnTransactionHash: string, index: number, option?: ITransactionOption) {
      this.checkForRoot("withdrawExit");

      return this.exitUtil.buildPayloadForExit(
          burnTransactionHash,
          Log_Event_Signature.Erc721Transfer,
          false,
          index
      ).then(payload => {
          return this.rootChainManager.exit(
              payload, option
          );
      });
    }

    // async withdrawExitMany(burnTransactionHash: string, option?: ITransactionOption) {
    //     this.checkForRoot("withdrawExitMany");

    //     return this.exitUtil.buildMultiplePayloadsForExit(
    //         burnTransactionHash,
    //         Log_Event_Signature.Erc721BatchTransfer,
    //         false
    //     ).then(async payloads => {
    //         const exitTxs = [];
    //         if()
    //         for(const i in payloads) {
    //           exitTxs.push(this.rootChainManager.exit(
    //             payloads[i], option
    //         ));
    //         }
    //         return Promise.all(exitTxs);
    //         });
    // }

    withdrawExitFaster(burnTransactionHash: string, option?: ITransactionOption) {
        this.checkForRoot("withdrawExitFaster");

        return this.exitUtil.buildPayloadForExit(
            burnTransactionHash,
            Log_Event_Signature.Erc721Transfer,
            true
        ).then(payload => {
            return this.rootChainManager.exit(
                payload, option
            );
        });
    }

    // withdrawExitFasterMany(burnTransactionHash: string, option?: ITransactionOption) {
    //     this.checkForRoot("withdrawExitFasterMany");


    //     return this.exitUtil.buildPayloadForExit(
    //         burnTransactionHash,
    //         Log_Event_Signature.Erc721BatchTransfer,
    //         true
    //     ).then(payload => {
    //         return this.rootChainManager.exit(
    //             payload, option
    //         );
    //     });
    // }

    isWithdrawExited(txHash: string) {
        return this.isWithdrawn(
            txHash, Log_Event_Signature.Erc721Transfer
        );
    }

    isWithdrawExitedMany(txHash: string) {
        return this.isWithdrawn(
            txHash, Log_Event_Signature.Erc721BatchTransfer
        );
    }

    isWithdrawExitedOnIndex(txHash: string, index: number) {
        return this.isWithdrawnOnIndex(
            txHash, index, Log_Event_Signature.Erc721Transfer
        );
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
        return this.transferERC721(
            from,
            to,
            tokenId,
            option
        );
    }

}
