import { ABIService } from "./abi_service";
import { config } from "../config";
import { NetworkService } from "./network_service";

export * from "./network_service";

class Service {
    network: NetworkService;
    zkEvmNetwork: NetworkService;
    abi: ABIService;
}

export const service = new Service();
service.abi = new ABIService(config.abiStoreUrl);



