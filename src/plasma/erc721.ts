import { BaseToken, Converter, Web3SideChainClient } from "../utils";
import { IPlasmaContracts, ITransactionOption } from "../interfaces";
import { PlasmaToken } from "./plasma_token";
import { Log_Event_Signature } from "../enums";

export class ERC721 extends PlasmaToken {

    constructor(
        tokenAddress: string,
        isParent: boolean,
        client: Web3SideChainClient,
        contracts: IPlasmaContracts

    ) {
        super({
            isParent,
            address: tokenAddress,
            name: 'ChildERC721'
        }, client, contracts);
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
     * 
     * safely deposit from parent to child
     * 
     * @param tokenId 
     * @param options 
     */
    safeDeposit(tokenId: string | number, userAddress: string, options?: ITransactionOption) {
        this.checkForRoot_("safeDeposit");

        return this.getContract().then(contract => {
            const method = contract.method(
                "safeTransferFrom",
                userAddress,
                this.contracts_.depositManager.address,
                tokenId,
            );

            return this.processWrite(method, options);
        });
    }

    withdrawStart(tokenId: string | number, options: ITransactionOption = {}) {
        this.checkForChild_("withdrawStart");


        return this.getContract().then(contract => {
            const method = contract.method(
                "withdraw",
                Converter.toHex(tokenId),
            );
            return this.processWrite(method, options);
        });
    }

    getPredicate() {
        return this['getPredicate_']("erc721Predicate", "ERC721Predicate");
    }


    private withdrawChallenge_(burnTxHash: string, isFast: boolean, option: ITransactionOption) {
        this.checkForRoot_("withdrawChallenge");

        return Promise.all([
            this.getPredicate(),
            this.contracts_.exitManager.buildPayloadForExit(
                burnTxHash,
                Log_Event_Signature.PlasmaErc721WithdrawEventSig,
                isFast
            )
        ]).then(result => {
            const [predicate, payload] = result;
            console.log("address", predicate.address);
            const method = predicate.method(
                "startExitWithBurntTokens",
                payload
            );
            return this.processWrite(method, option);
        });
    }

    withdrawChallenge(burnTxHash: string, option?: ITransactionOption) {
        return this.withdrawChallenge_(burnTxHash, false, option);
    }

    withdrawChallengeFaster(burnTxHash: string, option?: ITransactionOption) {
        return this.withdrawChallenge_(burnTxHash, true, option);
    }

    transfer(tokenId: string, from: string, to: string, option?: ITransactionOption) {
        return this.transferERC721_(
            from,
            to,
            tokenId,
            option
        );
    }

    getAllTokens(userAddress: string) {
        return this.getTokensCount(userAddress).then(balance => {
            balance = Number(balance);
            const promises = [];
            for (let i = 0; i < balance; i++) {
                promises.push(
                    this.getTokenIdAtIndexForUser(i, userAddress)
                );
            }
            return Promise.all(
                promises
            );
        });
    }
}
