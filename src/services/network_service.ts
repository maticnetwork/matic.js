import { BaseBigNumber, utils } from "..";
import { HttpRequest } from "../utils";

export class NetworkService {
    httpRequest: HttpRequest;

    constructor(baseUrl: string) {
        this.httpRequest = new HttpRequest(baseUrl);
    }

    private createUrlForPos(network: string, url: string) {
        return `${network === 'mainnet' ? 'matic' : 'mumbai'}${url}`;
    }

    private createUrlForZkEvm(network: string, url: string) {
        return `${network}/${url}`;
    }

    getBlockIncluded(network: string, blockNumber: number) {
        const url = this.createUrlForPos(network, `/block-included/${blockNumber}`);
        return this.httpRequest.get<{
            start: string;
            end: string;
            headerBlockNumber: BaseBigNumber;
        }>(url).then(result => {
            const headerBlockNumber = result.headerBlockNumber as any as string;
            const decimalHeaderBlockNumber = headerBlockNumber.slice(0, 2) === '0x' ? parseInt(
                headerBlockNumber, 16
            ) : headerBlockNumber;
            result.headerBlockNumber = new utils.BN(decimalHeaderBlockNumber);
            return result;
        });
    }

    getProof(network: string, start, end, blockNumber) {
        const url = this.createUrlForPos(network, `/fast-merkle-proof?start=${start}&end=${end}&number=${blockNumber}`);
        return this.httpRequest.get<any>(url).then(result => {
            return result.proof;
        });
    }

    getMerkleProofForZkEvm(network: string, networkID: number, depositCount: number) {
        const url = this.createUrlForZkEvm(network, `merkle-proof?net_id=${networkID}&deposit_cnt=${depositCount}`);
        return this.httpRequest.get<any>(url).then(result => {
            return result.proof;
        });
    }

    getBridgeTransactionDetails(network: string, networkID: number, depositCount: number) {
        const url = this.createUrlForZkEvm(network, `bridge?net_id=${networkID}&deposit_cnt=${depositCount}`);
        return this.httpRequest.get<any>(url).then(result => {
            return result.deposit;
        });
    }
}
