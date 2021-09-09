import { MaticWeb3Client } from "./web3js";
import { Logger } from "./utils";
import BN from "bn.js";

export let Web3Client = MaticWeb3Client;

export const setWeb3Client = (web3Client) => {
    Web3Client = web3Client;
}

export const EXTRA_GAS_FOR_PROXY_CALL = 1000000
export const LOGGER = new Logger();

export const BIG_ONE = new BN(1)
export const BIG_TWO = new BN(2)
export const CHECKPOINT_INTERVAL = new BN(10000)

export const MAX_AMOUNT = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
