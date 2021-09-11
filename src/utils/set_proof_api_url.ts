import { service, NetworkService } from "../services";

export const setProofApi = (url: string) => {
    service.network = new NetworkService(url) as any;
};