import { BaseContract } from "@/model";

export class InheritedEthContract extends BaseContract {
    get address() {
        return "";
    }

    call() {
        return Promise.resolve(null);
    }
}