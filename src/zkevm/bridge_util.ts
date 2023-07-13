import { Web3SideChainClient } from "../utils";
import { service } from "../services";
import { IBaseClientConfig } from "..";
import { TYPE_AMOUNT } from '../types';

interface IBridgeEventInfo {
    originNetwork: number;
    originTokenAddress: string;
    destinationNetwork: number;
    destinationAddress: string;
    amount: TYPE_AMOUNT;
    metadata: string;
    depositCount: number;
}

interface IMerkleProof {
    merkle_proof: string[];
    exit_root_num: string;
    l2_exit_root_num: string;
    main_exit_root: string;
    rollup_exit_root: string;
}

interface IClaimPayload {
    smtProof: string[];
    index: number;
    mainnetExitRoot: string;
    rollupExitRoot: string;
    originNetwork: number;
    originTokenAddress: string;
    destinationNetwork: number;
    destinationAddress: string;
    amount: TYPE_AMOUNT;
    metadata: string;
}

export class BridgeUtil {
    private client_: Web3SideChainClient<IBaseClientConfig>;
    private BRIDGE_TOPIC = "0x501781209a1f8899323b96b4ef08b168df93e0a90c673d1e4cce39366cb62f9b";

    constructor(client: Web3SideChainClient<IBaseClientConfig>) {
        this.client_ = client;
    }

    private decodedBridgeData_(data: string, isParent: boolean) {
        const client = isParent ? this.client_.parent : this.client_.child;
        return this.client_.getABI("PolygonZkEVMBridge", "zkevm").then(abi => {
            const types = abi.filter(event => event.name === "BridgeEvent");
            if (!types.length) {
                throw new Error("Data not decoded");
            }
            const decodedData = client.decodeParameters(data, types[0].inputs);
            const [leafType, originNetwork, originTokenAddress, destinationNetwork, destinationAddress, amount, metadata, depositCount] = decodedData;
            return {
                leafType,
                originNetwork,
                originTokenAddress,
                destinationNetwork,
                destinationAddress,
                amount,
                metadata: metadata || '0x',
                depositCount,
            } as IBridgeEventInfo;
        });
    }

    private getBridgeLogData_(transactionHash: string, isParent: boolean) {
        const client = isParent ? this.client_.parent : this.client_.child;
        return client.getTransactionReceipt(transactionHash)
            .then(receipt => {
                const logs = receipt.logs.filter(log => log.topics[0].toLowerCase() === this.BRIDGE_TOPIC);
                if (!logs.length) {
                    throw new Error("Log not found in receipt");
                }

                const data = logs[0].data;
                return this.decodedBridgeData_(data, isParent);
            });
    }

    private getProof_(networkId: number, depositCount: number) {
        return service.zkEvmNetwork.getMerkleProofForZkEvm(
            this.client_.config.network,
            networkId,
            depositCount,
        ).then(proof => {
            return proof as IMerkleProof;
        }).catch(_ => {
            throw new Error("Error in creating proof");
        });
    }

    getBridgeLogData(transactionHash: string, isParent: boolean) {
        return this.getBridgeLogData_(transactionHash, isParent);
    }

    buildPayloadForClaim(transactionHash: string, isParent: boolean, networkId: number) {
        return this.getBridgeLogData_(transactionHash, isParent).then(data => {
            const {
                originNetwork,
                originTokenAddress,
                destinationNetwork,
                destinationAddress,
                amount,
                metadata,
                depositCount } = data;
            return this.getProof_(networkId, depositCount).then(proof => {
                const payload = {} as IClaimPayload;
                payload.smtProof = proof.merkle_proof;
                payload.index = depositCount;
                payload.mainnetExitRoot = proof.main_exit_root;
                payload.rollupExitRoot = proof.rollup_exit_root;
                payload.originNetwork = originNetwork;
                payload.originTokenAddress = originTokenAddress;
                payload.destinationNetwork = destinationNetwork;
                payload.destinationAddress = destinationAddress;
                payload.amount = amount;
                payload.metadata = metadata;
                return payload;
            });
        });
    }
}
