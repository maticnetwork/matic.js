import { BaseToken, Web3SideChainClient } from "../model";
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
            abi: client.getABI('ChildERC721')
        }, client);
    }

    /**
     * READ
     * how many ERC721s are owned by this user
     * 
     * @param userAddress 
     * @param options 
     */
    getBalance(userAddress: string, options: ITransactionOption = {}) {
        const contract = this.contract;
        const method = contract.method(
            "balanceOf",
            userAddress
        );

        return this.processRead<number>(method, options);
    }

    /**
     * READ
     * returns token's id on that index
     * 
     * @param userAddress 
     * @param index starting from zero, if no token found on that it will return error
     * @param options 
     */
    tokenOfOwnerByIndexERC721(userAddress: string, index: number, options: ITransactionOption = {}) {
        const contract = this.contract;
        const method = contract.method(
            "tokenOfOwnerByIndex",
            userAddress,
            index
        );

        return this.processRead(method, options);
    }

    /**
     * WRITE
     * deposit ERC721 from parent to child
     * 
     * @param tokenId 
     * @param options 
     */
    safeDepositERC721(tokenId: number, options: ITransactionOption = {}) {
        if (!options.from) {
            throw new Error('missing param - options.from');
        }

        const contract = this.contract;
        const method = contract.method(
            "safeTransferFrom",
            options.from,
            this.depositManager.contract.address,
            tokenId,
        );

        return this.processWrite(method, options);
    }

    /**
     * WRITE
     * returns burn hash
     * 
     * @param tokenId 
     * @param options 
     */
    startWithdrawForNFT(tokenId: number, options: ITransactionOption = {}) {
        // validate all values here
        const contract = this.contract;
        const method = contract.method(
            "withdraw",
            tokenId,
        );
        return this.processWrite(method, options);
    }
}
