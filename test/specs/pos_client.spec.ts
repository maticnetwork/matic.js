import { erc721, from, posClient } from "./client";
import { expect } from 'chai'
import { ABIManager } from '@maticnetwork/maticjs'

describe('POS Client', () => {

    const abiManager = new ABIManager("testnet", "mumbai");
    before(() => {
        return Promise.all([
            posClient.init(),
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