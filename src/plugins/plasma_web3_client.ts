import { BaseWeb3Client, BaseContract } from "@/model";
import Web3 from 'web3';
import Contract from "web3/eth/contract";
import { ITransactionConfig, IPlugin } from "@/interfaces";
import { defaultExport } from "@/default";

class Web3JsContract extends BaseContract {
    contract: Contract;

    constructor(address: string, contract: Contract) {
        super(address);
        this.contract = contract;
    }

    call<T>(methodName: string, ...args): Promise<T> {
        console.log("args", args);
        return this.contract.methods[methodName](...args).call();
    }
}

class Web3JSClient extends BaseWeb3Client {

    private web3_: Web3;

    constructor(provider: any) {
        super(provider);
        this.web3_ = new Web3(provider);
    }

    read(config: ITransactionConfig) {
        return this.web3_.eth.call(config);
    }

    write(config: ITransactionConfig) {
        return this.web3_.eth.sendTransaction(config);
    }

    getContract(address: string, abi: any) {
        const cont = new this.web3_.eth.Contract(abi, address);
        return new Web3JsContract(address, cont as any);
    }
}

export class Web3Plugin implements IPlugin {
    setup(matic: typeof defaultExport) {
        matic.Web3Client = Web3JSClient;
    }
}