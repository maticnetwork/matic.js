import { HttpRequest } from "../utils";

export class ABIService {
    httpRequest: HttpRequest;

    constructor(baseUrl: string) {
        this.httpRequest = new HttpRequest(baseUrl);
    }

    getABI(network: string, version: string, bridgeType: string, contractName: string) {
        const url = `${network}/${version}/artifacts/${bridgeType}/${contractName}.json`;
        return this.httpRequest.get(url).then((result: any) => {
            return result.abi;
        });
    }

    getAddress(network: string, version: string) {
        const url = `${network}/${version}/index.json`;
        return this.httpRequest.get(url);
    }
}
