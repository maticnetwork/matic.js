import { SideChainClientOption } from "../types";
import { Web3Client } from "../constant";
import { IPlasmaClientConfig } from "../interfaces";
import MetaNetwork from '@maticnetwork/meta/network';

export class Web3SideChainClient {
    parent: SideChainClientOption;
    child: SideChainClientOption;

    metaNetwork: MetaNetwork;
    config: IPlasmaClientConfig;

    constructor(config: IPlasmaClientConfig) {
        config = config || {} as any;
        config.parent.defaultConfig = config.parent.defaultConfig || {} as any;
        config.child.defaultConfig = config.child.defaultConfig || {} as any;
        this.config = config;

        if (!Web3Client) {
            throw new Error("Web3Client is not set");
        }
        const network = config.network;
        const version = config.version;
        const metaNetwork = new MetaNetwork(network, version);
        if (!metaNetwork) {
            throw new Error(`network ${network} - ${version} is not supported`);
        }
        this.metaNetwork = metaNetwork;

        this.parent = {
            client: new Web3Client(config.parent.provider),
            option: {

            }
        };
        this.child = {
            client: new Web3Client(config.child.provider),
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

    getABI(name: string, type?: string) {
        return this.metaNetwork.abi(name, type);
    }

    get mainPlasmaContracts() {
        return this.metaNetwork.Main.Contracts;
    }

    get mainPOSContracts() {
        return this.metaNetwork.Main.POSContracts;
    }
}

