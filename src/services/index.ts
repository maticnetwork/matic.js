import { HttpRequest } from "../utils";

export class NetworkService {
    httpRequest: HttpRequest;

    constructor(baseUrl: string) {
        this.httpRequest = new HttpRequest(baseUrl);
    }

    getBlockIncluded(blockNumber: string) {
        const url = `block-included/${blockNumber}`;
        return this.httpRequest.get<{
            start: string;
            end: string;
            headerBlockNumber: string;
        }>(url);
    }

    getProof(start, end, blockNumber) {
        const url = `fast-merkle-proof?start=${start}&end=${end}&number=${blockNumber}`;
        return this.httpRequest.get<any>(url).then(result => {
            return result.proof;
        });
    }
}


