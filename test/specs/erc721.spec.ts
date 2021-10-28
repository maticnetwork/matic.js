import { erc721, from, posClient, posClientForTo, to, } from "./client";
import { expect } from 'chai'


describe('ERC721', () => {

    let erc721Child = posClient.erc721(erc721.child);
    let erc721Parent = posClient.erc721(erc721.parent, true);

    before(() => {
        return posClient.init();
    });

    it('getTokensCounts child', async () => {
        const tokensCount = await erc721Child.getTokensCount(from);
        console.log('tokensCount', tokensCount);
        expect(tokensCount).to.be.an('number');
        expect(tokensCount).gte(0);
    })

    it('getTokensCount parent', async () => {
        const tokensCount = await erc721Parent.getTokensCount(from);
        console.log('tokensCount', tokensCount);
        expect(tokensCount).to.be.an('number');
        expect(tokensCount).gte(0);
    })

    it('getAllTokens child', async () => {
        const tokensCount = await erc721Child.getTokensCount(from);
        const allTokens = await erc721Child.getAllTokens(from);
        expect(allTokens).to.be.an('array').length(tokensCount);
    })

    it('getAllTokens parent', async () => {
        const tokensCount = await erc721Parent.getTokensCount(from);
        const allTokens = await erc721Parent.getAllTokens(from);
        expect(allTokens).to.be.an('array').length(tokensCount);
    })

    it('transfer return tx', async () => {
        const allTokensFrom = await erc721Child.getAllTokens(from);
        const targetToken = allTokensFrom[0];
        const result = await erc721Child.transfer(targetToken, from, to, {
            returnTransaction: true
        });
        // console.log(result);
        expect(result['to'].toLowerCase()).equal(erc721.child.toLowerCase());
    })

    it('approve return tx', async () => {
        const allTokens = await erc721Parent.getAllTokens(from);
        const result = await erc721Parent.approve(allTokens[0], {
            returnTransaction: true
        });
        expect(result['to'].toLowerCase()).equal(erc721.parent.toLowerCase());
    })

    it('approveAll return tx', async () => {
        const result = await erc721Parent.approveAll({
            returnTransaction: true
        });
        expect(result['to'].toLowerCase()).equal(erc721.parent.toLowerCase());
    })

    // return;

    it('transfer write', async () => {
        const allTokensFrom = await erc721Child.getAllTokens(from);
        console.log('allTokensFrom', allTokensFrom);
        const allTokensTo = await erc721Child.getAllTokens(to);
        console.log('allTokensTo', allTokensTo);

        const targetToken = allTokensFrom[0];
        let result = await erc721Child.transfer(targetToken, from, to);

        let txHash = await result.getTransactionHash();
        expect(txHash).to.be.an('string');
        // console.log('txHash', txHash);
        let txReceipt = await result.getReceipt();
        // console.log("txReceipt", txReceipt);

        expect(txReceipt.transactionHash).equal(txHash);
        expect(txReceipt).to.be.an('object');
        expect(txReceipt.from).equal(from);
        expect(txReceipt.to.toLowerCase()).equal(erc721.child.toLowerCase());
        expect(txReceipt.type).equal('0x0');
        expect(txReceipt.gasUsed).to.be.an('number').gt(0);
        expect(txReceipt.cumulativeGasUsed).to.be.an('number').gt(0);


        const newAllTokensFrom = await erc721Child.getAllTokens(from);
        console.log('newAllTokensFrom', newAllTokensFrom);
        expect(newAllTokensFrom.length).equal(allTokensFrom.length - 1);
        const newAllTokensTo = await erc721Child.getAllTokens(to);
        console.log('newAllTokensTo', newAllTokensTo);
        expect(newAllTokensTo.length).equal(allTokensTo.length + 1);

        await posClientForTo.init();

        const erc721ChildToken = posClientForTo.erc721(erc721.child);


        // transfer token back to sender
        result = await erc721ChildToken.transfer(targetToken, to, from);
        txHash = await result.getTransactionHash();
        txReceipt = await result.getReceipt();

        const newFromCount = await erc721Child.getTokensCount(from);
        const newToCount = await erc721Child.getTokensCount(to);

        expect(newFromCount).equal(allTokensFrom.length);
        expect(newToCount).equal(allTokensTo.length);

    })

    if (process.env.NODE_ENV !== 'test_all') return;

    it('approve', async () => {
        const allTokens = await erc721Parent.getAllTokens(from);
        const result = await erc721Parent.approve(allTokens[0], {
            returnTransaction: true
        });
        expect(result['to'].toLowerCase()).equal(erc721.parent.toLowerCase());
    })
});