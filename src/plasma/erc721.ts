import { BaseToken, Web3SideChainClient } from "../utils";
import { ITransactionOption } from "../interfaces";
import { DepositManager } from "./deposit_manager";

export class ERC721 extends BaseToken {

    constructor(
        tokenAddress: string,
        isParent: boolean,
        client: Web3SideChainClient,
        public depositManager: DepositManager
    ) {
        super({
            isParent,
            tokenAddress,
            tokenContractName: 'ChildERC721'
        }, client);
    }

    /**
     * how many ERC721s are owned by this user
     * 
     * @param userAddress 
     * @param options 
     */
    getBalance(userAddress: string, options: ITransactionOption = {}) {
        this.getContract().then(contract => {
            const method = contract.method(
                "balanceOf",
                userAddress
            );
            return this.processRead<number>(method, options);
        });
    }

    /**
     * READ
     * returns token's id on that index
     * 
     * @param userAddress 
     * @param index starting from zero, if no token found on that it will return error
     * @param options 
     */
    getOwnerByIndex(userAddress: string, index: number, options?: ITransactionOption) {
        return this.getContract().then(contract => {
            const method = contract.method(
                "tokenOfOwnerByIndex",
                userAddress,
                index
            );

            return this.processRead(method, options);
        });
    }

    /**
     * WRITE
     * deposit ERC721 from parent to child
     * 
     * @param tokenId 
     * @param options 
     */
    // safeDepositERC721(tokenId: number, options?: ITransactionOption) {
    //     return this.getContract().then(contract => {
    //         const method = contract.method(
    //             "safeTransferFrom",
    //             options.from,
    //             this.depositManager.contract.address,
    //             tokenId,
    //         );

    //         return this.processWrite(method, options);
    //     });
    // }

    /**
     * WRITE
     * returns burn hash
     * 
     * @param tokenId 
     * @param options 
     */
    startWithdrawForNFT(tokenId: number, options: ITransactionOption = {}) {
        return this.getContract().then(contract => {
            const method = contract.method(
                "withdraw",
                tokenId,
            );
            return this.processWrite(method, options);
        });
    }
}
