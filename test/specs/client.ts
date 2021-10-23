import { POSClient } from "@maticnetwork/maticjs";
import HDWalletProvider from "@truffle/hdwallet-provider";
import { user1, rpc, pos } from "../config";

const privateKey = user1.privateKey;
export const from = user1.address;
export const erc20 = {
    parent: pos.parent.erc20,
    child: pos.child.erc20
}

export const posClient = new POSClient({
    log: true,
    network: 'testnet',
    version: 'mumbai',
    parent: {
        provider: new HDWalletProvider(privateKey, rpc.parent),
        defaultConfig: {
            from
        }
    },
    child: {
        provider: new HDWalletProvider(privateKey, rpc.child),
        defaultConfig: {
            from
        }
    }
});