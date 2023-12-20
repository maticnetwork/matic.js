import { BaseBigNumber, utils } from "..";
import { HttpRequest } from "../utils";

export class NetworkService {
    httpRequest: HttpRequest;

    constructor(baseUrl: string) {
        this.httpRequest = new HttpRequest(baseUrl);
    }

    private createUrlForPos(version: string, url: string) {
        return `${version === 'v1' ? 'matic' : version}${url}`;
    }

    private createUrlForZkEvm(version: string, url: string) {
        return `${version}/${url}`;
    }

    getBlockIncluded(version: string, blockNumber: number) {
        const url = this.createUrlForPos(version, `/block-included/${blockNumber}`);
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

    getExitProof(version: string, burnTxHash: string, eventSignature: string) {
        const url = this.createUrlForPos(version, `/exit-payload/${burnTxHash}?eventSignature=${eventSignature}`);
        return this.httpRequest.get<any>(url).then(result => {
            return result.result;
        });
    }

    getProof(version: string, start, end, blockNumber) {
        const url = this.createUrlForPos(version, `/fast-merkle-proof?start=${start}&end=${end}&number=${blockNumber}`);
        return this.httpRequest.get<any>(url).then(result => {
            return result.proof;
        });
    }

    getMerkleProofForZkEvm(version: string, networkID: number, depositCount: number) {
        const url = this.createUrlForZkEvm(version, `merkle-proof?net_id=${networkID}&deposit_cnt=${depositCount}`);
        return this.httpRequest.get<any>(url).then(result => {
            return result.proof;
        });
    }

    getBridgeTransactionDetails(version: string, networkID: number, depositCount: number) {
        const url = this.createUrlForZkEvm(version, `bridge?net_id=${networkID}&deposit_cnt=${depositCount}`);
        return this.httpRequest.get<any>(url).then(result => {
            return result.deposit;
        });
    }
}
