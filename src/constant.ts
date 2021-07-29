import { InheritedWeb3Client } from "./inherited";

export let Web3Client: typeof InheritedWeb3Client;

export const setWeb3Client = (web3Client) => {
    Web3Client = web3Client;
}
