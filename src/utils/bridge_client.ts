import { Web3SideChainClient } from "../utils";
import { ExitUtil } from "../pos";
import { BaseToken, utils } from "..";

export class BridgeClient<T> {

    client: Web3SideChainClient<T> = new Web3SideChainClient();

    exitUtil: ExitUtil;

    /**
     * check whether a txHash is checkPointed 
     *
     * @param {string} txHash
     * @returns
     * @memberof BridgeClient
     */
    isCheckPointed(txHash: string) {
        return this.exitUtil.isCheckPointed(
            txHash
        );
    }

    isDeposited(depositTxHash: string) {
        const client = this.client;

        const token = new BaseToken({
            address: client.abiManager.getConfig("Matic.GenesisContracts.StateReceiver"),
            isParent: false,
            name: 'StateReceiver',
            bridgeType: 'genesis'
        }, client);

        return token.getContract().then(contract => {
            return Promise.all([
                client.parent.getTransactionReceipt(depositTxHash),
                token['processRead']<string>(
                    contract.method("lastStateId")
                )
            ]);
        }).then(result => {
            const [receipt, lastStateId] = result;
            const eventSignature = `0x103fed9db65eac19c4d870f49ab7520fe03b99f1838e5996caf47e9e43308392`;
            const targetLog = receipt.logs.find(q => q.topics[0] === eventSignature);
            if (!targetLog) {
                throw new Error("StateSynced event not found");
            }
            const rootStateId = client.child.decodeParameters(targetLog.topics[1], ['uint256'])[0];
            const rootStateIdBN = utils.BN.isBN(rootStateId) ? rootStateId : new utils.BN(rootStateId);
            return new utils.BN(lastStateId).gte(
                rootStateIdBN
            );
        });
    }

}