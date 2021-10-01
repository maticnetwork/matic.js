import { IBaseClientConfig } from "./base_client_config";

export interface IPlasmaClientConfig extends IBaseClientConfig {

    depositManager?: string;
    withdrawManager?: string;
    registry?: string;
    rootChain?: string;
}