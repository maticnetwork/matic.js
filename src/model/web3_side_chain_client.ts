import { SideChainClientOption } from "@/types";
import { Web3Client } from "@/constant";
import { IPlasmaClientConfig } from "@/interfaces";
import MetaNetwork from '@maticnetwork/meta/network';

export class Web3SideChainClient {
    parent: SideChainClientOption;
    child: SideChainClientOption;

    metaNetwork: MetaNetwork;

    constructor(option: IPlasmaClientConfig) {
        if (!Web3Client) {
            throw new Error("Web3Client is not set");
        }
        const network = option.network;
        const version = option.version;
        const metaNetwork = new MetaNetwork(network, version);
        if (!metaNetwork) {
            throw new Error(`network ${network} - ${version} is not supported`);
        }
        this.metaNetwork = metaNetwork;

        this.parent = {
            client: new Web3Client(option.parent.provider),
            option: {

            }
        };
        this.child = {
            client: new Web3Client(option.child.provider),
            option: {

            }
        };

        // this.child.client.extend('bor', [
        //     {

        //         name: 'getRootHash',
        //         call: 'eth_getRootHash',
        //         params: 2,
        //         inputFormatter: [Number, Number],
        //         outputFormatter: String,
        //     }
        // ])
    }

    getABI(name: string) {
        return this.metaNetwork.abi(name);
    }

    get mainContracts() {
        return this.metaNetwork.Main.Contracts;
    }
}

