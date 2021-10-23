import { erc20, from, posClient } from "./client";
import { expect } from 'chai'


describe('ERC20', () => {

    let erc20Child = posClient.erc20(erc20.child);
    let erc20Parent = posClient.erc20(erc20.parent, true);

    before(() => {
        return posClient.init();
    });

    it('get balance child', async () => {
        const balance = await erc20Child.getBalance(from);
        console.log('balance', balance);
        expect(balance).to.be.an('string');
        expect(Number(balance)).gt(0);
    })

    it('get balance parent', async () => {
        const balance = await erc20Child.getBalance(from);
        console.log('balance', balance);
        expect(balance).to.be.an('string');
        expect(Number(balance)).gt(0);
    })
});