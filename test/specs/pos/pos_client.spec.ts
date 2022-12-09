import { from, posClient, posClientForTo, privateKey, RPC, to, toPrivateKey } from "./client";
import { expect } from 'chai'
import { ABIManager } from '@maticnetwork/maticjs'
import { providers, Wallet } from "ethers";


describe('POS Client', () => {

    const abiManager = new ABIManager("testnet", "mumbai");
    const parentPrivder = new providers.JsonRpcProvider(RPC.parent);
    const childProvider = new providers.JsonRpcProvider(RPC.child);

    before(() => {
        return Promise.all([
            posClient.init({
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
            }),
            posClientForTo.init({
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
            }),
            abiManager.init()
        ]);
    });

    it('depositEther return transaction', async () => {
        const amount = 100;
        const result = await posClient.depositEther(amount, from, {
            returnTransaction: true
        });
        const rootChainManager = await abiManager.getConfig("Main.POSContracts.RootChainManagerProxy")
        expect(result['to'].toLowerCase()).equal(rootChainManager.toLowerCase());
        expect(result['value']).equal('0x64')
    })
});