import { Web3Client, LOGGER } from "../constant";
import { IPlasmaClientConfig } from "../interfaces";
import { BaseWeb3Client } from "../abstracts";
import { ABIHelper } from "../helpers";

export class Web3SideChainClient {
    parent: BaseWeb3Client;
    child: BaseWeb3Client;

    config: IPlasmaClientConfig;

    abiHelper: ABIHelper;

    constructor(config: IPlasmaClientConfig) {
        config = config || {} as any;
        config.parent.defaultConfig = config.parent.defaultConfig || {} as any;
        config.child.defaultConfig = config.child.defaultConfig || {} as any;
        this.config = config;

        if (!Web3Client) {
            throw new Error("Web3Client is not set");
        }

        this.parent = new Web3Client(config.parent.provider, this.logger);
        this.child = new Web3Client(config.child.provider, this.logger);

    }

    init() {
        const config = this.config;
        const network = config.network;
        const version = config.version;
        const abiHelper = this.abiHelper = new ABIHelper(network, version);
        return abiHelper.init().catch(err => {
            throw new Error(`network ${network} - ${version} is not supported`);
        });
    }

    getABI(name: string, type?: string) {
        return this.abiHelper.getABI(name, type);
    }

    get mainPlasmaContracts() {
        return this.abiHelper.getAddress("Main.Contracts");
    }

    get mainPOSContracts() {
        return this.abiHelper.getAddress("Main.POSContracts");
    }

    get logger() {
        return LOGGER;
    }
}

