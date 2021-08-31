import { IBaseClientConfig } from "./base_client_config";

export interface IPOSClientConfig extends IBaseClientConfig {
    rootChainManager?: string;
    rootChain?: string;
}