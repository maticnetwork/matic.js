import { erc20, from, posClient, to } from "./client";
import { expect } from 'chai'


describe('ERC20', () => {

    let erc20Child = posClient.erc20(erc20.child);
    let erc20Parent = posClient.erc20(erc20.parent, true);
    before(() => {
        return posClient.init();
    });

    it('get balance child', async () => {
        console.log('process.env.NODE_ENV', process.env.NODE_ENV);

        const balance = await erc20Child.getBalance(from);
        console.log('balance', balance);
        expect(balance).to.be.an('string');
        expect(Number(balance)).gte(0);
    })

    it('get balance parent', async () => {
        const balance = await erc20Parent.getBalance(from);
        console.log('balance', balance);
        expect(balance).to.be.an('string');
        expect(Number(balance)).gte(0);
    })

    it('get allowance', async () => {
        const allowance = await erc20Parent.getAllowance(from);
        expect(allowance).to.be.an('string');
        expect(Number(allowance)).gte(0);
    })

    it('is check pointed', async () => {
        const isCheckPointed = await posClient.isCheckPointed('0xd6f7f4c6052611761946519076de28fbd091693af974e7d4abc1b17fd7926fd7');
        expect(isCheckPointed).to.be.an('boolean').equal(true);
    })

    it('isWithdrawExited', async () => {
        const exitTxHash = '0x95844235073da694e311dc90476c861e187c36f86a863a950534c9ac2b7c1a48';
        const isExited = await erc20Parent.isWithdrawExited('0xd6f7f4c6052611761946519076de28fbd091693af974e7d4abc1b17fd7926fd7');
        expect(isExited).to.be.an('boolean').equal(true);
    })

    // it('isDeposited', async () => {
    //     const txHash = '0xc67599f5c967f2040786d5924ec55d37bf943c009bdd23f3b50e5ae66efde258';
    //     const isExited = await posClient.isDeposited(txHash);
    //     expect(isExited).to.be.an('boolean').equal(true);
    // })

    if (process.env.NODE_ENV === 'test_all') {
        // it('transfer', async () => {
        //     const result = await erc20Child.transfer(to, '10');
        //     const txHash = await result.getTransactionHash();
        //     expect(txHash).to.be.an('string');

        //     const txReceipt = await result.getReceipt();
        //     expect(txReceipt).to.be.an('object');
        // });

        // it('approve', async () => {
        //     const result = await erc20Parent.approve('10');

        //     const txHash = await result.getTransactionHash();
        //     expect(txHash).to.be.an('string');

        //     const txReceipt = await result.getReceipt();
        //     console.log("txReceipt", txReceipt);
        //     expect(txReceipt.type).equal('0x0');
        // });

        it('deposit', async () => {
            const result = await erc20Parent.deposit('10', from);

            const txHash = await result.getTransactionHash();
            expect(txHash).to.be.an('string');

            const txReceipt = await result.getReceipt();
            expect(txReceipt).to.be.an('object');
        });
    }
});