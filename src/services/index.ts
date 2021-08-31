import { HttpRequest } from "../utils";
import BN from "bn.js";

class NetworkService {
    httpRequest: HttpRequest;

    constructor(baseUrl: string) {
        this.httpRequest = new HttpRequest(baseUrl);
    }

    getBlockIncluded(blockNumber: number) {
        const url = `/block-included/${blockNumber}`;
        return this.httpRequest.get<{
            start: string;
            end: string;
            headerBlockNumber: string;
            blockNumber: BN
        }>(url).then(result => {
            result['blockNumber'] = result.headerBlockNumber as any;
            return result;
        });
    }

    getProof(start, end, blockNumber) {
        const url = `/fast-merkle-proof?start=${start}&end=${end}&number=${blockNumber}`;
        return this.httpRequest.get<any>(url).then(result => {
            return result.proof;
        });
    }
}

export let service: NetworkService;

export const initService = (url: string) => {
    service = new NetworkService(url);
};


