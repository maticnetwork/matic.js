import { from, hermezClient, hermezClientForTo, privateKey, RPC, to, toPrivateKey } from "./client";
import { expect } from 'chai'
import { ABIManager } from '@maticnetwork/maticjs'
import { providers, Wallet } from "ethers";


describe('Hermez Client', () => {

    const abiManager = new ABIManager("testnet", "litchi");
    const parentPrivder = new providers.JsonRpcProvider(RPC.parent);
    const childProvider = new providers.JsonRpcProvider(RPC.child);

    before(() => {
        return Promise.all([
            hermezClient.init({
                // log: true,
                network: 'testnet',
                version: 'litchi',
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
            }),
            hermezClientForTo.init({
                // log: true,
                network: 'testnet',
                version: 'litchi',
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
            }),
            abiManager.init()
        ]);
    });
});