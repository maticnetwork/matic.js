import { ITransactionConfig, IPlugin, ITransactionResult } from "../interfaces";
import { defaultExport } from "../default";
import { EtherWeb3Client } from "./web3_client";


export class EthersPlugin implements IPlugin {
    setup(matic: typeof defaultExport) {
        matic.Web3Client = EtherWeb3Client as any;
    }
}