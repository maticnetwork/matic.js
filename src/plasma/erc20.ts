import { BaseToken, Web3SideChainClient } from "@/model";

export class ERC20 extends BaseToken {

    constructor(client: Web3SideChainClient, abi: string) {
        super(client, abi);
    }

    getBalance(userAddress: string, tokenAddress: string, isParent: boolean) {
        const contract = this.getContract(tokenAddress, isParent);
        return contract.call<string>("balanceOf", userAddress);
    }

}