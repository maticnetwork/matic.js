import { HttpRequest } from "../utils";
import BN from "bn.js";

export class NetworkService {
    httpRequest: HttpRequest;

    constructor(baseUrl: string) {
        this.httpRequest = new HttpRequest(baseUrl);
    }

    private createUrl(network: string, url: string) {
        return `${network === 'mainnet' ? 'matic' : 'mumbai'}${url}`;
    }

    getBlockIncluded(network: string, blockNumber: number) {

        const url = this.createUrl(network, `/block-included/${blockNumber}`);
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

    getProof(network: string, start, end, blockNumber) {
        const url = this.createUrl(network, `/fast-merkle-proof?start=${start}&end=${end}&number=${blockNumber}`);
        return this.httpRequest.get<any>(url).then(result => {
            return result.proof;
        });
    }
}