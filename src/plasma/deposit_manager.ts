import { BaseToken, Web3SideChainClient } from "../utils";

export class DepositManager extends BaseToken {

    constructor(client: Web3SideChainClient, address: string) {
        super(
            {
                isParent: true,
                tokenAddress: address,
                tokenContractName: "DepositManager"
            },
            client
        );
    }

    get address() {
        return this.contractParam.tokenAddress;
    }

}