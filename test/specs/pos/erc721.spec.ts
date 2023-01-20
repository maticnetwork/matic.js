import { erc721, from, posClient, posClientForTo, to, } from "./client";
import { expect } from 'chai'
import { ABIManager, setProofApi } from '@maticnetwork/maticjs'


describe('ERC721', () => {

    let erc721Child = posClient.erc721(erc721.child);
    let erc721Parent = posClient.erc721(erc721.parent, true);

    const abiManager = new ABIManager("testnet", "mumbai");
    before(() => {
        return Promise.all([
            abiManager.init()
        ]);
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

    it('isWithdrawExited', async () => {
        // const exitHash = '0xa3ed203336807249dea53dc99434e2d06b71c85f55c89ee49ca10244ab3dbcf5';
        const isExited = await erc721Parent.isWithdrawExited('0x2697a930ae883dd28c40a263a6a3b4d41a027cab56836de987ed2c2896abcdeb');
        expect(isExited).equal(true);
    })

    it('isDeposited for deposit many', async () => {
        const depositTxhash = '0x2ae0f5073e0c0f96f622268ef8bc61ecec7349ffc97c61412e4f5cc157cb418e';
        const isExited = await posClient.isDeposited(depositTxhash);
        expect(isExited).equal(true);
    })

    it('transfer return tx', async () => {
        const allTokensFrom = await erc721Child.getAllTokens(from);
        const targetToken = allTokensFrom[0];
        if (targetToken) {
            const result = await erc721Child.transfer(targetToken, from, to, {
                returnTransaction: true
            });
            // console.log(result);
            expect(result['to'].toLowerCase()).equal(erc721.child.toLowerCase());
        }

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

    it('deposit return tx', async () => {
        const allTokens = await erc721Parent.getAllTokens(from);
        if (allTokens && allTokens[0]) {
            const tx = await erc721Parent.deposit(allTokens[0], from, {
                returnTransaction: true
            });
            const rootChainManager = await abiManager.getConfig("Main.POSContracts.RootChainManagerProxy")
            expect(tx['to'].toLowerCase()).equal(rootChainManager.toLowerCase());
        }
    })

    it('depositMany return tx', async () => {
        const allTokens = await erc721Parent.getAllTokens(from);
        if (allTokens && allTokens.length) {
            const tx = await erc721Parent.depositMany(allTokens, from, {
                returnTransaction: true
            });
            const rootChainManager = await abiManager.getConfig("Main.POSContracts.RootChainManagerProxy")
            expect(tx['to'].toLowerCase()).equal(rootChainManager.toLowerCase());
        }

    })

    it('withdrawStart return tx', async () => {
        const allTokens = await erc721Child.getAllTokens(from);
        if (allTokens && allTokens.length) {
            const result = await erc721Child.withdrawStart(allTokens[0], {
                returnTransaction: true
            });
            expect(result['to'].toLowerCase()).equal(erc721.child.toLowerCase());
        }
    })

    it('withdrawStartWithMetaData return tx', async () => {
        const allTokens = await erc721Child.getAllTokens(from);
        if (allTokens && allTokens.length) {
            const result = await erc721Child.withdrawStartWithMetaData(allTokens[0], {
                returnTransaction: true
            });
            expect(result['to'].toLowerCase()).equal(erc721.child.toLowerCase());
        }
    })

    if (process.env.NODE_ENV !== 'test_all') return;

    it('transfer write', async () => {
        const allTokensFrom = await erc721Child.getAllTokens(from);
        // console.log('allTokensFrom', allTokensFrom);
        const allTokensTo = await erc721Child.getAllTokens(to);
        // console.log('allTokensTo', allTokensTo);

        const targetToken = allTokensFrom[0];
        if (targetToken) {
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
            expect(txReceipt.type).equal(2);
            expect(txReceipt.gasUsed).to.be.an('number').gt(0);
            expect(txReceipt.cumulativeGasUsed).to.be.an('number').gt(0);


            const newAllTokensFrom = await erc721Child.getAllTokens(from);
            // console.log('newAllTokensFrom', newAllTokensFrom);
            expect(newAllTokensFrom.length).equal(allTokensFrom.length - 1);
            const newAllTokensTo = await erc721Child.getAllTokens(to);
            // console.log('newAllTokensTo', newAllTokensTo);
            expect(newAllTokensTo.length).equal(allTokensTo.length + 1);

            const erc721ChildToken = posClientForTo.erc721(erc721.child);


            // transfer token back to sender
            result = await erc721ChildToken.transfer(targetToken, to, from);
            txHash = await result.getTransactionHash();
            txReceipt = await result.getReceipt();

            const newFromCount = await erc721Child.getTokensCount(from);
            const newToCount = await erc721Child.getTokensCount(to);

            expect(newFromCount).equal(allTokensFrom.length);
            expect(newToCount).equal(allTokensTo.length);
        }

    })

    it('approve', async () => {
        const allTokens = await erc721Parent.getAllTokens(from);
        if (allTokens && allTokens[0]) {
            const result = await erc721Parent.approve(allTokens[0], {
                returnTransaction: true
            });
            expect(result['to'].toLowerCase()).equal(erc721.parent.toLowerCase());
        }

    })
});
