import { BaseToken, Web3SideChainClient, promiseResolve } from "../utils";
import { IContractInitParam, IPOSClientConfig, ITransactionOption } from "../interfaces";
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


    getPredicateAddress(): Promise<string> {
        if (this.predicateAddress) {
            return promiseResolve(this.predicateAddress);
        }
        return this.rootChainManager.method(
            "tokenToType",
            this.contractParam.address
        ).then(method => {
            return method.read();
        }).then(tokenType => {
            if (!tokenType) {
                throw new Error('Invalid Token Type');
            }
            return this.rootChainManager.method(
                "typeToPredicate", tokenType
            );
        }).then(typeToPredicateMethod => {
            return typeToPredicateMethod.read<string>();
        }).then(predicateAddress => {
            this.predicateAddress = predicateAddress;
            return predicateAddress;
        });
    }

    protected isWithdrawn(txHash: string, eventSignature: string) {
        if (!txHash) {
            throw new Error(`txHash not provided`);
        }
        return this.exitUtil.getExitHash(
            txHash, 0, eventSignature
        ).then(exitHash => {
            return this.rootChainManager.isExitProcessed(
                exitHash
            );
        });
    }

    protected isWithdrawnOnIndex(txHash: string, index: number, eventSignature: string) {
      if (!txHash) {
          throw new Error(`txHash not provided`);
      }
      return this.exitUtil.getExitHash(
          txHash, index, eventSignature
      ).then(exitHash => {
          return this.rootChainManager.isExitProcessed(
              exitHash
          );
      });
  }

    protected withdrawExitPOS(burnTxHash: string, eventSignature: string, isFast: boolean, option: ITransactionOption) {
        return this.exitUtil.buildPayloadForExit(
            burnTxHash,
            eventSignature,
            isFast
        ).then(payload => {
            return this.rootChainManager.exit(
                payload, option
            );
        });
    }
}
