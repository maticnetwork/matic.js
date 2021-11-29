import { service } from "../services";
import { resolve, promiseResolve } from ".";

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

const cache: T_ABI_CACHE = {};

export class ABIManager {
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

    getConfig(path: string) {
        return resolve(
            cache[this.networkName][this.version].address,
            path
        );
    }

    getABI(contractName: string, bridgeType = 'plasma'): Promise<any> {
        const targetBridgeABICache = cache[this.networkName][this.version].
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
            this.setABI(contractName, bridgeType, result);
            return result;
        });
    }

    setABI(contractName: string, bridgeType: string, abi: any) {
        const abiStore = cache[this.networkName][this.version].abi;
        if (!abiStore[bridgeType]) {
            abiStore[bridgeType] = {};
        }
        abiStore[bridgeType][contractName] = abi;
    }
}