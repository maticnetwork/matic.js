import { service, NetworkService } from "../services";

export const setProofApi = (url: string) => {
    const urlLength = url.length;
    if (url[urlLength - 1] !== '/') {
        url += '/';
    }
    url += 'api/v1/';
    service.network = new NetworkService(url);
};

export const setHermezProofApi = (url: string) => {
    const urlLength = url.length;
    if (url[urlLength - 1] !== '/') {
        url += '/';
    }
    service.hermezNetwork = new NetworkService(url);
};
