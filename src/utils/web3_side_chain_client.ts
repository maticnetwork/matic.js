import { Web3Client } from "../constant";
import { IBaseClientConfig, IPOSClientConfig } from "../interfaces";
import { BaseWeb3Client } from "../abstracts";
import { ABIManager } from "../helpers";
import { Logger } from "./logger";

export class Web3SideChainClient<T_CONFIG> {
    parent: BaseWeb3Client;
    child: BaseWeb3Client;

    config: T_CONFIG;

    abiHelper: ABIManager;

    logger = new Logger();

    constructor(config: T_CONFIG) {
        config = config || {} as any;
        const baseConfig: IBaseClientConfig = config as any;
        baseConfig.parent.defaultConfig = baseConfig.parent.defaultConfig || {} as any;
        baseConfig.child.defaultConfig = baseConfig.child.defaultConfig || {} as any;
        this.config = baseConfig as any;

        if (!Web3Client) {
            throw new Error("Web3Client is not set");
        }

        this.parent = new (Web3Client as any)(baseConfig.parent.provider, this.logger);
        this.child = new (Web3Client as any)(baseConfig.child.provider, this.logger);

        this.logger.enableLog(baseConfig.log);
    }

    init() {
        const config = this.config as any as IBaseClientConfig;
        const network = config.network;
        const version = config.version;
        const abiHelper = this.abiHelper = new ABIManager(network, version);
        console.log("init called", abiHelper);
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


}

