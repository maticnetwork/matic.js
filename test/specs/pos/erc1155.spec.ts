import { erc1155, from, posClient, posClientForTo, to, } from "./client";
import { expect } from 'chai'
import { ABIManager, setProofApi } from '@maticnetwork/maticjs'


describe('ERC1155', () => {

    console.log('erc1155', posClient.erc1155);

    let erc1155Child = posClient.erc1155(erc1155.child);
    let erc1155Parent = posClient.erc1155(erc1155.parent, true);

    console.log('erc1155 token created');

    const abiManager = new ABIManager("testnet", "mumbai");
    before(() => {
        return Promise.all([
            abiManager.init()
        ]);
    });

    it('getBalance child', async () => {
        const balance = await erc1155Child.getBalance(from, 123);
        expect(balance).to.be.an('string');
        expect(Number(balance)).gte(0);
    })

    it('getBalance parent', async () => {
        const balance = await erc1155Parent.getBalance(from, '123');
        expect(balance).to.be.an('string');
        expect(Number(balance)).gte(0);
    })

    it('isWithdrawExited', async () => {
        // const exitHash = '0xa3ed203336807249dea53dc99434e2d06b71c85f55c89ee49ca10244ab3dbcf5';
        const isExited = await erc1155Parent.isWithdrawExited('0xbc48c0ccd9821141779a200586ef52033a3487c4e1419625fe7a0ea984521052');
        expect(isExited).equal(true);
    })

    it('isDeposited', async () => {
        const txHash = '0x507ea7267693d477917265f52c23c08f1830215a0c7d86643b9c1fb4997a021e';
        const isDeposited = await posClient.isDeposited(txHash);
        expect(isDeposited).to.be.an('boolean').equal(true);
    })

    it('transfer return tx', async () => {
        const targetToken = 123;

        const result = await erc1155Child.transfer({
            amount: 1,
            from: from,
            to: to,
            tokenId: targetToken
        }, {
            returnTransaction: true
        });
        // console.log(result);
        expect(result['to'].toLowerCase()).equal(erc1155.child.toLowerCase());
    })

    it('approveAll return tx', async () => {
        const result = await erc1155Parent.approveAll({
            returnTransaction: true
        });
        expect(result['to'].toLowerCase()).equal(erc1155.parent.toLowerCase());
    })

    it('deposit return tx', async () => {
        const tx = await erc1155Parent.deposit({
            amount: 1,
            tokenId: 123,
            userAddress: from
        }, {
            returnTransaction: true
        });
        const rootChainManager = await abiManager.getConfig("Main.POSContracts.RootChainManagerProxy");
        console.log('tx', tx['to'], 'root', rootChainManager);
        expect(tx['to'].toLowerCase()).equal(rootChainManager.toLowerCase());
    })

    // it('depositMany return tx', async () => {
    //     const tx = await erc1155Parent.depositMany(allTokens, from, {
    //         returnTransaction: true
    //     });
    //     const rootChainManager = await abiManager.getConfig("Main.POSContracts.RootChainManagerProxy")
    //     expect(tx['to'].toLowerCase()).equal(rootChainManager.toLowerCase());
    // })

    it('withdrawStart return tx', async () => {
        const result = await erc1155Child.withdrawStart(123, 10, {
            returnTransaction: true
        });
        expect(result['to'].toLowerCase()).equal(erc1155.child.toLowerCase());
    })

    it('withdrawStartMany return tx', async () => {
        const result = await erc1155Child.withdrawStartMany([123], [10], {
            returnTransaction: true
        });
        expect(result['to'].toLowerCase()).equal(erc1155.child.toLowerCase());
    })

    if (process.env.NODE_ENV !== 'test_all') return;

    it('transfer write', async () => {
        const targetToken = 123;
        const allTokensFrom = await erc1155Child.getBalance(from, targetToken);
        console.log('allTokensFrom', allTokensFrom);
        const allTokensTo = await erc1155Child.getBalance(to, targetToken);
        console.log('allTokensTo', allTokensTo);
        const amountToTransfer = 1;
        let result = await erc1155Child.transfer({
            tokenId: targetToken, from, to,
            amount: amountToTransfer
        });

        let txHash = await result.getTransactionHash();
        expect(txHash).to.be.an('string');
        // console.log('txHash', txHash);
        let txReceipt = await result.getReceipt();
        // console.log("txReceipt", txReceipt);

        expect(txReceipt.transactionHash).equal(txHash);
        expect(txReceipt).to.be.an('object');
        expect(txReceipt.from).equal(from);
        expect(txReceipt.to.toLowerCase()).equal(erc1155.child.toLowerCase());
        expect(txReceipt.type).equal(2);
        expect(txReceipt.gasUsed).to.be.an('number').gt(0);
        expect(txReceipt.cumulativeGasUsed).to.be.an('number').gt(0);


        const newAllTokensFrom = await erc1155Child.getBalance(from, targetToken);
        const newAllTokensFromInNumber = Number(newAllTokensFrom);
        console.log('newAllTokensFrom', newAllTokensFrom);
        expect(newAllTokensFromInNumber).equal(Number(allTokensFrom) - 1);
        const newAllTokensTo = await erc1155Child.getBalance(to, targetToken);
        const newAllTokensToInNumber = Number(newAllTokensTo);
        console.log('newAllTokensTo', newAllTokensTo);
        expect(newAllTokensToInNumber).equal(Number(allTokensTo) + 1);

        const erc1155ChildToken = posClientForTo.erc1155(erc1155.child);

        // transfer token back to sender
        result = await erc1155ChildToken.transfer({
            tokenId: targetToken,
            to: from,
            from: to,
            amount: amountToTransfer
        });
        txHash = await result.getTransactionHash();
        txReceipt = await result.getReceipt();

        const newFromCount = await erc1155Child.getBalance(from, targetToken);
        const newToCount = await erc1155Child.getBalance(to, targetToken);

        expect(newFromCount).equal(allTokensFrom);
        expect(newToCount).equal(allTokensTo);

    })

    it('approve', async () => {
        const result = await erc1155Parent.approveAll({
            returnTransaction: true
        });
        expect(result['to'].toLowerCase()).equal(erc1155.parent.toLowerCase());
    })
});
