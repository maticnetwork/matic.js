import { erc721, from, posClient } from "./client";
import { expect } from 'chai'


describe('POS Bridge', () => {

    before(() => {
        return posClient.init();
    });

    it('depositEther return transaction', async () => {
        const amount = 100;
        const result = await posClient.depositEther(amount, from, {
            returnTransaction: true
        });
        console.log('tokensCount', result);

    })
});