import { BaseToken, Web3SideChainClient } from "../utils";

export class Erc20Predicate extends BaseToken {

    constructor(client: Web3SideChainClient, address: string) {
        super(
            {
                isParent: true,
                tokenAddress: address,
                tokenContractName: "ERC20Predicate"
            },
            client
        );
    }

}