import { Logger } from "./utils";
import BN from "bn.js";
import { BaseWeb3Client } from "./abstracts";

export let Web3Client: typeof BaseWeb3Client;

export const setWeb3Client = (web3Client) => {
    Web3Client = web3Client;
}

export const EXTRA_GAS_FOR_PROXY_CALL = 1000000
 

export const BIG_ONE = new BN(1)
export const BIG_TWO = new BN(2)
export const CHECKPOINT_INTERVAL = new BN(10000)

export const MAX_AMOUNT = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
