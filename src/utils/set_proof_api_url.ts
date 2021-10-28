import { service, NetworkService } from "../services";

export const setProofApi = (url: string) => {
    if (url[url.length - 1] !== '/') {

    }
    service.network = new NetworkService(url) as any;
};