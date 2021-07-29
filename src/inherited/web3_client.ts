import { BaseContract, BaseWeb3Client } from "@/model";
import { InheritedEthContract } from "./eth_contract";

export class InheritedWeb3Client extends BaseWeb3Client {
    get provider() {
        return "";
    }

    getContract() {
        return new InheritedEthContract("");
    }

    read(config) {
        return Promise.resolve(null);
    }
    write(config) {
        return Promise.resolve(null);
    }
}