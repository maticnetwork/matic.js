import { erc20, from, posClient, posClientForTo, to } from "./client";
import { expect } from 'chai'
import { ABIManager, setProofApi, service, utils, ITransactionRequestConfig } from '@maticnetwork/maticjs'
import BN from "bn.js";


describe('ERC20', () => {

    let erc20Child = posClient.erc20(erc20.child);
    let erc20Parent = posClient.erc20(erc20.parent, true);

    const abiManager = new ABIManager("testnet", "mumbai");
    before(() => {
        return Promise.all([
            abiManager.init()
        ]);
    });

    it('get balance child', async () => {
        console.log('process.env.NODE_ENV', process.env.NODE_ENV, posClient.client);

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

    it('get allowance parent', async () => {
        const allowance = await erc20Parent.getAllowance(from);
        expect(allowance).to.be.an('string');
        expect(Number(allowance)).gte(0);
    })

    it('get allowance child', async () => {
        const allowance = await erc20Child.getAllowance(from);
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

    it('child transfer returnTransaction with eip1159', async () => {
        const amount = 1;
        try {
            const result = await erc20Child.transfer(amount, to, {
                maxFeePerGas: 10,
                maxPriorityFeePerGas: 10,
                returnTransaction: true
            });
            console.log('result', result);
        } catch (error) {
            console.log('error', error);
            expect(error).deep.equal({
                message: `Child chain doesn't support eip-1559`,
                type: 'eip-1559_not_supported'
            })
        }
    });

    it('child transfer returnTransaction', async () => {
        const amount = 1;
        const result = await erc20Child.transfer(amount, to, {
            returnTransaction: true
        });
        expect(result).to.have.not.property('maxFeePerGas')
        expect(result).to.have.not.property('maxPriorityFeePerGas')
        // expect(result).to.have.property('gasPrice')
        // expect(result['gasPrice']).to.be.an('number').gt(0);
        expect(result).to.have.property('chainId', 80001);
        expect(result['chainId']).to.be.an('number');
    });

    it('parent transfer returnTransaction with eip1159', async () => {
        const amount = 1;
        const result = await erc20Parent.transfer(amount, to, {
            maxFeePerGas: 20,
            maxPriorityFeePerGas: 20,
            returnTransaction: true
        });

        expect(result).to.have.property('maxFeePerGas', 20)
        expect(result).to.have.property('maxPriorityFeePerGas', 20)
        expect(result).to.have.not.property('gasPrice')
        expect(result).to.have.property('chainId', 5);

    });

    it('isDeposited', async () => {
        const txHash = '0xc67599f5c967f2040786d5924ec55d37bf943c009bdd23f3b50e5ae66efde258';
        const isDeposited = await posClient.isDeposited(txHash);
        expect(isDeposited).to.be.an('boolean').equal(true);
    })

    it('withdraw start return tx', async () => {

        const result = await erc20Child.withdrawStart('1', {
            returnTransaction: true
        });

        expect(result['to'].toLowerCase()).equal(erc20.child.toLowerCase());
        expect(result).to.have.property('data')

    });

    it('approve parent return tx', async () => {
        const result = await erc20Parent.approve('1', {
            returnTransaction: true
        });

        expect(result['to'].toLowerCase()).equal(erc20.parent.toLowerCase());
        expect(result).to.have.property('data')

    });

    it('approve parent return tx with spender address', async () => {
        const spenderAddress = await erc20Parent.getPredicateAddress();
        const result = await erc20Parent.approve('1', {
            spenderAddress: spenderAddress,
            returnTransaction: true
        });

        expect(result['to'].toLowerCase()).equal(erc20.parent.toLowerCase());
        expect(result).to.have.property('data')

    });

    it('approve child return tx without spender address', async () => {
        try {
            const result = await erc20Child.approve('1');
            expect(result['to'].toLowerCase()).equal(erc20.child.toLowerCase());
            expect(result).to.have.property('data');
        } catch (error) {
            // console.log('error', error);
            expect(error).eql({
                type: 'null_spender_address',
                message: 'Please provide spender address.'
            });
        }
    });

    it('deposit return tx', async () => {
        const result = await erc20Parent.deposit(1, from, {
            returnTransaction: true
        });

        const rootChainManager = await abiManager.getConfig("Main.POSContracts.RootChainManagerProxy")
        expect(result['to'].toLowerCase()).equal(rootChainManager.toLowerCase());
    });

    const exitData = "0x3805550f00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000827f9082484235e69b0b9010031f7f7ef8848837caca0654cdd16c2c1af23e138d5ea431107325c6d99dfa567b8e395866f4fd177d79de4a8fec9d06ecea4223f55d1724e6c8455dc62148394266f9e732545254f25407139bd8cb3ecfbd9053933f23e1fca181659680cf4c1a5a6c6f723df2d7d35f3fc14929c8ccef3a9fff644db162a845ecf3a89f41b98436f15fada0f112ebea28f29e9e97f3635bd68ff97de3c0f5cdbd867bd8cb13af5930f55ca3b9ee8f345c3923965d2935a72bb4ddff77b6d5a8f427fbe79945d58189e2f58bec6c09e38c058bb80978eee60bcc260c883be329eb37a9c029e7d5733a173b53aeb0e92f925db4dc681d4bfa2f05c8c5fdd296230d1411b05264a84013c786a84617a6c24a0a317bf456e88f02bccaab4c7aa1a919485ee451901772eeff615a2ab305f3ca0a0984131328f0f9b4ffba09638e99ce4ec98b1aec6eb46eb3023078a03be9d51f8b902ebf902e801830743f9b9010000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000008000000800000000000000000000100000000000000000000020000000000000000000800000000000000000080000010000000000000000000010000000008000000000000000000000000000000000000000000200000000000000020000000000000010001000000000000000000000000004000000003000000000001000000000000000000000000000000100000400020000000000000000000000000000000000000000000000000000000000000100000f901ddf89b94fe4f5145f6e09952a5ba9e956ed0c25e3fa4c7f1f863a0ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa0000000000000000000000000fd71dc9721d9ddcf0480a582927c3dcd42f3064ca00000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000af9013d940000000000000000000000000000000000001010f884a04dfe1bbbcf077ddc3e01291eea2d5c70c2b422b415d95645b9adcfd678cb1d63a00000000000000000000000000000000000000000000000000000000000001010a0000000000000000000000000fd71dc9721d9ddcf0480a582927c3dcd42f3064ca0000000000000000000000000c26880a0af2ea0c7e8130e6ec47af756465452e8b8a000000000000000000000000000000000000000000000000000005d17d8a0120000000000000000000000000000000000000000000000006f680513d061bb0d020000000000000000000000000000000000000000000001c57a98b6c5d67d41f500000000000000000000000000000000000000000000006f6804b6b8891afb020000000000000000000000000000000000000000000001c57a9913ddaf1d53f5b903dbf903d8f851a051de183267eca4127869bd2deab74a212d98ec445ea022f108006a65d32011b780808080808080a0f3099598ea2f187f803b8d66b328edf300720bfb016f4d89b4a1eceebf969f508080808080808080f89180a0ee5f307c063eefc1f9ad442f3b9f8f2981f9385b41da5465de5ac5dec863d5c7a0d5a8f8f4ab278e0aea28f1044da97c7bd3a5e807b48cd01bf705b704aa5ddd14a032a40b81b5316142b455addcb7bdd194be8e38196408efefcc4291803a402eeea0188088651f1f064c8fa57051108a83c9d695f1a124dc3783ed2a2e6e7c8fd21a808080808080808080808080f902ef20b902ebf902e801830743f9b9010000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000008000000800000000000000000000100000000000000000000020000000000000000000800000000000000000080000010000000000000000000010000000008000000000000000000000000000000000000000000200000000000000020000000000000010001000000000000000000000000004000000003000000000001000000000000000000000000000000100000400020000000000000000000000000000000000000000000000000000000000000100000f901ddf89b94fe4f5145f6e09952a5ba9e956ed0c25e3fa4c7f1f863a0ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa0000000000000000000000000fd71dc9721d9ddcf0480a582927c3dcd42f3064ca00000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000af9013d940000000000000000000000000000000000001010f884a04dfe1bbbcf077ddc3e01291eea2d5c70c2b422b415d95645b9adcfd678cb1d63a00000000000000000000000000000000000000000000000000000000000001010a0000000000000000000000000fd71dc9721d9ddcf0480a582927c3dcd42f3064ca0000000000000000000000000c26880a0af2ea0c7e8130e6ec47af756465452e8b8a000000000000000000000000000000000000000000000000000005d17d8a0120000000000000000000000000000000000000000000000006f680513d061bb0d020000000000000000000000000000000000000000000001c57a98b6c5d67d41f500000000000000000000000000000000000000000000006f6804b6b8891afb020000000000000000000000000000000000000000000001c57a9913ddaf1d53f58200038000000000000000000000000000000000000000000000000000"

    it('withdrawExit return tx', async () => {
        const result: ITransactionRequestConfig = await erc20Parent.withdrawExit('0x1c20c41b9d97d1026aa456a21f13725df63edec1b1f43aacb180ebcc6340a2d3', {
            returnTransaction: true
        }) as any;
        expect(result.data).equal(
            exitData
        );
        const rootChainManager = await abiManager.getConfig("Main.POSContracts.RootChainManagerProxy")
        expect(result['to'].toLowerCase()).equal(rootChainManager.toLowerCase());
        console.log("withdraw exit ended");
    });

    it('withdrawExitFaster return tx without setProofAPI', async () => {
        try {
            const result = await erc20Parent.withdrawExitFaster('0x1c20c41b9d97d1026aa456a21f13725df63edec1b1f43aacb180ebcc6340a2d3', {
                returnTransaction: true
            });
            throw new Error("there should be exception");
        } catch (error) {
            expect(error).deep.equal({
                message: `Proof api is not set, please set it using "setProofApi"`,
                type: 'proof_api_not_set'
            })
        }
    });

    // it('call getBlockIncluded', async () => {

    //     setProofApi("https://proof-generator.polygon.technology");
    //     try {
    //         // const result = await service.network.getBlockIncluded("testnet", 1000);
    //         // console.log("result", result);
    //         // expect(result.end).to.be.an('string');
    //         // expect(result.start).to.be.an('string');
    //         // expect(utils.BN.isBN(result.headerBlockNumber)).equal(true);

    //     } catch (error) {
    //         console.error('error', error, error.stack);
    //     }

    // });

    it('withdrawExitFaster return tx', async () => {
        setProofApi("https://proof-generator.polygon.technology");

        const result: ITransactionRequestConfig = await erc20Parent.withdrawExitFaster('0x1c20c41b9d97d1026aa456a21f13725df63edec1b1f43aacb180ebcc6340a2d3', {
            returnTransaction: true
        }) as any;
        expect(result.data).equal(
            exitData
        )
        const rootChainManager = await abiManager.getConfig("Main.POSContracts.RootChainManagerProxy")
        expect(result['to'].toLowerCase()).equal(rootChainManager.toLowerCase());

    });

    if (process.env.NODE_ENV !== 'test_all') return;

    it('child transfer', async () => {
        const oldBalance = await erc20Child.getBalance(to);
        console.log('oldBalance', oldBalance);
        const amount = 1;
        let result = await erc20Child.transfer(amount, to);
        let txHash = await result.getTransactionHash();
        expect(txHash).to.be.an('string');
        // console.log('txHash', txHash);
        let txReceipt = await result.getReceipt();
        // console.log("txReceipt", txReceipt);

        expect(txReceipt.transactionHash).equal(txHash);
        expect(txReceipt).to.be.an('object');
        expect(txReceipt.from.toLowerCase()).equal(from.toLowerCase());
        expect(txReceipt.to.toLowerCase()).equal(erc20.child.toLowerCase());
        expect(txReceipt.type).equal(2);
        expect(txReceipt.gasUsed).to.be.an('number').gt(0);
        expect(txReceipt.cumulativeGasUsed).to.be.an('number').gt(0);

        expect(txReceipt).to.have.property('blockHash')
        expect(txReceipt).to.have.property('blockNumber');
        expect(txReceipt).to.have.property('events');
        // expect(txReceipt).to.have.property('logs');
        expect(txReceipt).to.have.property('logsBloom');
        expect(txReceipt).to.have.property('status');
        expect(txReceipt).to.have.property('transactionIndex');

        const newBalance = await erc20Child.getBalance(to);
        console.log('newBalance', newBalance);

        const oldBalanceBig = new BN(oldBalance);
        const newBalanceBig = new BN(newBalance);

        expect(newBalanceBig.toString()).equal(
            oldBalanceBig.add(new BN(amount)).toString()
        )

        //transfer money back to user
        const erc20ChildToken = posClientForTo.erc20(erc20.child);

        result = await erc20ChildToken.transfer(amount, to);
        txHash = await result.getTransactionHash();
        txReceipt = await result.getReceipt();
    });

    it('approve', async () => {
        const result = await erc20Parent.approve('10');

        const txHash = await result.getTransactionHash();
        expect(txHash).to.be.an('string');

        const txReceipt = await result.getReceipt();
        console.log("txReceipt", txReceipt);
        expect(txReceipt.type).equal(2);
    });

    it('deposit', async () => {
        const result = await erc20Parent.deposit('1', from);

        const txHash = await result.getTransactionHash();
        expect(txHash).to.be.an('string');

        const txReceipt = await result.getReceipt();
        expect(txReceipt).to.be.an('object');
    });

});
