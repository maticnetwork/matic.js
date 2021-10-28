import { BaseToken, Web3SideChainClient, promiseResolve } from "../utils";
import { IContractInitParam, IPOSClientConfig } from "../interfaces";
import { IPOSContracts } from "../interfaces";

export class POSToken extends BaseToken<IPOSClientConfig> {

    private predicateAddress: string;

    constructor(
        contractParam: IContractInitParam,
        client: Web3SideChainClient<IPOSClientConfig>,
        protected getPOSContracts: () => IPOSContracts
    ) {
        super(contractParam, client);
    }

    protected get rootChainManager() {
        return this.getPOSContracts().rootChainManager;
    }

    protected get exitUtil() {
        return this.getPOSContracts().exitUtil;
    }


    async getPredicateAddress() {
        if (this.predicateAddress) {
            return promiseResolve(this.predicateAddress);
        }
        const method = await this.rootChainManager.method("tokenToType", this.contractParam.address);
        const tokenType = await method.read();
        if (!tokenType) {
            throw new Error('Invalid Token Type');
        }
        const typeToPredicateMethod = await this.rootChainManager.method
            (
                "typeToPredicate", tokenType
            );
        const predicateAddress = await typeToPredicateMethod.read<string>();
        this.predicateAddress = predicateAddress;
        return predicateAddress;
    }

    protected isWithdrawn(txHash: string, eventSignature: string) {
        if (!txHash) {
            throw new Error(`txHash not provided`);
        }
        return this.exitUtil.getExitHash(
            txHash, eventSignature
        ).then(exitHash => {
            return this.rootChainManager.isExitProcessed(
                exitHash
            );
        });
    }
}