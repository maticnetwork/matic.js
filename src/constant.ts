import { MaticWeb3Client } from "./inherited";

export let Web3Client: typeof MaticWeb3Client;

export const setWeb3Client = (web3Client) => {
    Web3Client = web3Client;
}
