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
            address: tokenAddress,
            name: 'ChildERC721'
        }, client);
    }

    /**
     * how many ERC721s are owned by this user
     * 
     * @param userAddress 
     * @param options 
     */
    getBalance(userAddress: string, options: ITransactionOption = {}) {
        return this.getContract().then(contract => {
            const method = contract.method(
                "balanceOf",
                userAddress
            );
            return this.processRead<number>(method, options);
        });
    }

    /**
     * returns token id on that index for owner
     * 
     * @param userAddress 
     * @param index starting from zero, if no token found on that it will return error
     * @param options 
     */
    getTokenIdForOwnerByIndex(index: number, userAddress: string, options?: ITransactionOption) {
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
     * 
     * safely deposit from parent to child
     * 
     * @param tokenId 
     * @param options 
     */
    safeDeposit(tokenId: string | number, userAddress: string, options?: ITransactionOption) {
        return this.getContract().then(contract => {
            const method = contract.method(
                "safeTransferFrom",
                userAddress,
                this.depositManager.address,
                tokenId,
            );

            return this.processWrite(method, options);
        });
    }

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
