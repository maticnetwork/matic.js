import { erc721, from, posClient } from "./client";
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
        expect(tokensCount).to.be.an('string');
        expect(Number(tokensCount)).gte(0);
    })

    it('getTokensCount parent', async () => {
        const tokensCount = await erc721Parent.getTokensCount(from);
        console.log('tokensCount', tokensCount);
        expect(tokensCount).to.be.an('string');
        expect(Number(tokensCount)).gte(0);
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
});