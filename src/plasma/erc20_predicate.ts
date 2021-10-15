import { BaseToken, Web3SideChainClient } from "../utils";

export class ErcPredicate extends BaseToken {

    constructor(client: Web3SideChainClient, address: string, contractName: string) {
        super(
            {
                isParent: true,
                address: address,
                name: contractName
            },
            client
        );
    }

}