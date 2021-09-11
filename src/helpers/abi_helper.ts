import { service } from "../services";
import { resolve, promiseResolve } from "../utils";

type T_ABI_CACHE = {
    [networkName: string]: {
        [version: string]: {
            address: any,
            abi: {
                [bridgeType: string]: {
                    [contractName: string]: any
                }
            }
        }
    }
};

let cache: T_ABI_CACHE = {};

export class ABIHelper {
    constructor(public networkName: string, public version: string) {

    }

    init() {
        return service.abi.getAddress(
            this.networkName, this.version
        ).then(result => {
            cache[this.networkName] = {
                [this.version]: {
                    address: result,
                    abi: {}
                }
            };
        });
    }

    getAddress(path: string) {
        return resolve(
            cache[this.networkName][this.version].address,
            path
        );
    }

    getABI(contractName: string, bridgeType = 'plasma'): Promise<any> {
        let targetBridgeABICache = cache[this.networkName][this.version].
            abi[bridgeType];

        if (targetBridgeABICache) {
            const abiForContract = targetBridgeABICache[contractName];
            if (abiForContract) {
                return promiseResolve<any>(abiForContract);
            }
        }
        return service.abi.getABI(
            this.networkName,
            this.version,
            bridgeType,
            contractName
        ).then(result => {
            targetBridgeABICache = {
                [contractName]: result
            };
            return result;
        });
    }

    static set cache(value: T_ABI_CACHE) {
        cache = value;
    }

    static get cache() {
        return cache;
    }
}