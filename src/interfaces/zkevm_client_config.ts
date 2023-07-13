import { IBaseClientConfig } from "./base_client_config";

export interface IZkEvmClientConfig extends IBaseClientConfig {
    parentBridge?: string;
    childBridge?: string;
}
