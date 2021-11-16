import { POSClient } from "@maticnetwork/maticjs";
import HDWalletProvider from "@truffle/hdwallet-provider";
import { user1, rpc, pos, user2 } from "../config";
import { providers, Wallet } from "ethers";

export const privateKey = user1.privateKey;
export const from = user1.address;
export const to = user2.address;
export const toPrivateKey = user2.privateKey;

export const RPC = rpc;

export const erc20 = {
    parent: pos.parent.erc20,
    child: pos.child.erc20
}
export const erc721 = {
    parent: pos.parent.erc721,
    child: pos.child.erc721
}

const parentPrivder = new providers.JsonRpcProvider(rpc.parent);
const childProvider = new providers.JsonRpcProvider(rpc.child);


export const posClient = new POSClient({
    // log: true,
    network: 'testnet',
    version: 'mumbai',
    parent: {
        provider: new Wallet(privateKey, parentPrivder),
        defaultConfig: {
            from
        }
    },
    child: {
        provider: new Wallet(privateKey, childProvider),
        defaultConfig: {
            from
        }
    }
});

export const posClientForTo = new POSClient({
    // log: true,
    network: 'testnet',
    version: 'mumbai',
    parent: {
        provider: new Wallet(toPrivateKey, parentPrivder),
        defaultConfig: {
            from: to
        }
    },
    child: {
        provider: new Wallet(toPrivateKey, childProvider),
        defaultConfig: {
            from: to
        }
    }
});