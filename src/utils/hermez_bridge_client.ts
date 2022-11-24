import { Web3SideChainClient } from "../utils";
import { BridgeUtil } from "../hermez";

export class HermezBridgeClient<T> {

    client: Web3SideChainClient<T> = new Web3SideChainClient();

    bridgeUtil: BridgeUtil;

    /**
     * check whether a txHash is synced with child chain 
     *
     * @param {string} txHash
     * @returns
     * @memberof HermezBridgeClient
     */
    isDepositClaimable(txHash: string) {
        return;
    }

    /**
     * check whether proof is submitted on parent chain
     *
     * @param {string} txHash
     * @returns
     * @memberof HermezBridgeClient
     */
    isWithdrawExitable(txHash: string) {
        return;
    }

}