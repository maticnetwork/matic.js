import { ExitUtil } from "../pos";

export class BridgeClient {
    exitManager: ExitUtil;

    /**
     * check whether a txHash is checkPointed 
     *
     * @param {string} txHash
     * @returns
     * @memberof BridgeClient
     */
    isCheckPointed(txHash: string) {
        return this.exitManager.isCheckPointed(
            txHash
        );
    }

}