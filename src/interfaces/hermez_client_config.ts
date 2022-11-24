import { IBaseClientConfig } from "./base_client_config";

export interface IHermezClientConfig extends IBaseClientConfig {
    parentBridge?: string;
    childBridge?: string;
}