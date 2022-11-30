import { erc20, ether, from, hermezClient, hermezClientForTo, to } from "./client";
import { expect } from 'chai'
import { ABIManager } from '@maticnetwork/maticjs'
import BN from "bn.js";


describe('ERC20', () => {

    let erc20Child = hermezClient.erc20(erc20.child);
    let erc20Parent = hermezClient.erc20(erc20.parent, true);

    let etherChild = hermezClient.erc20(ether.child);
    let etherParent = hermezClient.erc20(ether.parent, true);

    const abiManager = new ABIManager("testnet", "mumbai");
    before(() => {
        return Promise.all([
            abiManager.init()
        ]);
    });

    // BALANCE
    it('get erc20 balance child', async () => {
        console.log('process.env.NODE_ENV', process.env.NODE_ENV, hermezClient.client);

        const balance = await erc20Child.getBalance(from);
        console.log('balance', balance);
        expect(balance).to.be.an('string');
        expect(Number(balance)).gte(0);
    })

    it('get erc20 balance parent', async () => {
        const balance = await erc20Parent.getBalance(from);
        console.log('balance', balance);
        expect(balance).to.be.an('string');
        expect(Number(balance)).gte(0);
    })

    it('get ether balance child', async () => {
        console.log('process.env.NODE_ENV', process.env.NODE_ENV, hermezClient.client);

        const balance = await etherChild.getBalance(from);
        console.log('balance', balance);
        expect(balance).to.be.an('string');
        expect(Number(balance)).gte(0);
    })

    it('get ether balance parent', async () => {
        const balance = await etherParent.getBalance(from);
        console.log('balance', balance);
        expect(balance).to.be.an('string');
        expect(Number(balance)).gte(0);
    })

    // ALLOWANCE
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

    // IS DEPOSIT CLAIMABLE
    it('is Deposit Claimable', async () => {
        const isDepositClaimable = await hermezClient.isDepositClaimable('0x81594c5e9a73e195c6fb13db1b25e9388407611ad4649b01f61d85c27eb86049');
        expect(isDepositClaimable).to.be.an('boolean').equal(true);
    })

    // IS WITHDRAW EXITABLE
    it('is Withdraw Exitable', async () => {
        const isWithdrawExitable = await hermezClient.isWithdrawExitable('0xd2019abfdb978346cfc886525752b3d8a5798b8c474a46a8d18ed9b293bd5862');
        expect(isWithdrawExitable).to.be.an('boolean').equal(true);
    })

    // IS DEPOSITED
    it('is Deposited', async () => {
        const isDeposited = await hermezClient.isDeposited('0x81594c5e9a73e195c6fb13db1b25e9388407611ad4649b01f61d85c27eb86049');
        expect(isDeposited).to.be.an('boolean').equal(true);
    })

    // IS EXITED
    it('is Exited', async () => {
        const isExited = await hermezClient.isExited('0x81594c5e9a73e195c6fb13db1b25e9388407611ad4649b01f61d85c27eb86049');
        expect(isExited).to.be.an('boolean').equal(true);
    })

    // TRANSFER
    it('child transfer returnTransaction with eip1159', async () => {
        const amount = 10;
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
        const amount = 10;
        const result = await erc20Child.transfer(amount, to, {
            returnTransaction: true
        });
        expect(result).to.have.not.property('maxFeePerGas')
        expect(result).to.have.not.property('maxPriorityFeePerGas')
        // expect(result).to.have.property('gasPrice')
        // expect(result['gasPrice']).to.be.an('number').gt(0);
        expect(result).to.have.property('chainId', 1402);
        expect(result['chainId']).to.be.an('number');
    });

    it('parent transfer returnTransaction with eip1159', async () => {
        const amount = 10;
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

    // APPROVE
    it('approve parent return tx', async () => {
        const result = await erc20Parent.approve('10', {
            returnTransaction: true
        });

        expect(result['to'].toLowerCase()).equal(erc20.parent.toLowerCase());
        expect(result).to.have.property('data')
    });

    it('approve parent return tx with spender address', async () => {
        const spenderAddress = await erc20Parent.getBridgeAddress();
        const result = await erc20Parent.approve('10', {
            spenderAddress: spenderAddress,
            returnTransaction: true
        });

        expect(result['to'].toLowerCase()).equal(erc20.parent.toLowerCase());
        expect(result).to.have.property('data')
    });

    it('approve child return tx without spender address', async () => {
        try {
            const result = await erc20Child.approve('10');
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

    // PERMIT
    it('permit data', async () => {
        const result = await etherParent.getPermitData(10, {
            returnTransaction: true
        });
        expect(result).to.be.an('string');
    });

    // DEPOSIT
    it('deposit ether return tx', async () => {
        const result = await etherParent.deposit(10, from, {
            returnTransaction: true
        });

        const bridge = await abiManager.getConfig("Main.zkEVMContracts.BridgeProxy")
        expect(result['to'].toLowerCase()).equal(bridge.toLowerCase());
        expect(Number(result['value'])).eq(10);
        expect(result).to.have.property('data');
    });

    it('deposit erc20 return tx', async () => {
        const result = await erc20Parent.deposit(10, from, {
            returnTransaction: true
        });

        const bridge = await abiManager.getConfig("Main.zkEVMContracts.BridgeProxy")
        expect(result['to'].toLowerCase()).equal(bridge.toLowerCase());
        expect(result).to.have.property('data');
    });

    it('deposit erc20 with permit return tx', async () => {
        const result = await erc20Parent.depositWithPermit(10, from, {
            returnTransaction: true
        });

        const bridge = await abiManager.getConfig("Main.zkEVMContracts.BridgeProxy")
        expect(result['to'].toLowerCase()).equal(bridge.toLowerCase());
        expect(result).to.have.property('data');
    });

    it('claim erc20 deposit return tx', async () => {
        const result = await erc20Parent.depositClaim('0x067ed611aa63d607186dcc0d70a7b60dd909c6d91b40842f424a6dadeae21f22', {
            returnTransaction: true
        });

        const bridge = await abiManager.getConfig("zkEVM.Contracts.BridgeProxy")
        expect(result['to'].toLowerCase()).equal(bridge.toLowerCase());
        expect(result).to.have.property('data');
    });

    // WITHDRAW
    it('erc20 withdraw return tx', async () => {
        const result = await erc20Child.withdraw('1', from, {
            returnTransaction: true
        });

        const bridge = await abiManager.getConfig("zkEVM.Contracts.BridgeProxy")
        expect(result['to'].toLowerCase()).equal(bridge.toLowerCase());
        expect(result).to.have.property('data');
    });

    it('ether withdraw return tx', async () => {
        const result = await etherChild.withdraw('1', from, {
            returnTransaction: true
        });

        const bridge = await abiManager.getConfig("zkEVM.Contracts.BridgeProxy")
        expect(result['to'].toLowerCase()).equal(bridge.toLowerCase());
        expect(Number(result['value'])).eq(1);
        expect(result).to.have.property('data');
    });

    const exitData = '0x5d5d326f00000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000e743776c4840a5af4773755062ff5b9e62b10dd39321f79d155e23dd79f32d614ea5b17e7fada5feb5c19abf5c4640da7aa6b1405d659a006de6c80933d1c56340d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000fd71dc9721d9ddcf0480a582927c3dcd42f3064c0000000000000000000000000000000000000000000000000003328b944c400000000000000000000000000000000000000000000000000000000000000005600000000000000000000000000000000000000000000000000000000000000020a9f6b096519e017de4c8a3a12a04caff69de9caea872f5b13573ec4e62708fae650a16dd2d88d2a69bad071376c3a772bb5c2eeb28ee418cd0c2dc089f22829b194d824c3e9f530ff9cca5bd960fa8c38d47355d9981edf0207a42481f5c81c45376b4374fffaf8381debd36d3c90fa219da8acf08afd5c38e2a533e5e916aa371bc83920b28517b7ca955286812be1f825bb8ff9090ab59155fa57bee6e46f5014f13d30c5e670b9a058620b408fb76edebc23617a6af6564c6faa64c01326942db0146f1789b447120e68d5164d2303ffe048c5e41e40382d9d636e58b4eb89027c513740da9a58058e64a2e25e7d74d0ad9a74a37a05c2328eb7c8c4fbd1a9867cc5f7f196b93bae1e27e6320742445d290f2263827498b54fec539f756af75ac602f9900a53be23ebc6d94231c54c8486cab2f81fe37c5c3d2154b1a039ca2eea7b16f992ac60284cc78197e7b1f345359b35f29a051e321fad14f41e9be3b7355ca5a10f560b36f8089d64dc69b7ecbba4103ae4e0b5894a622b8873a253490c6ceeb450aecdc82e28293031d10c7d73bf85e57bf041a97360aa2c5d99cc1df82d9c4b87413eae2ef048f94b4d3554cea73d92b0f7af96e0271c691e2bb5c67add7c6caf302256adedf7ab114da0acfe870d449a3a489f781d659e8beccda7bce9f4e8618b6bd2f4132ce798cdc7a60e7e1460a7299e3c6342a579626d22733e50f526ec2fa19a22b31e8ed50f23cd1fdf94c9154ed3a7609a2f1ff981fe1d3b5c807b281e4683cc6d6315cf95b9ade8641defcb32372f1c126e398ef7a5a2dce0a8a7f68bb74560f8f71837c2c2ebbcbf7fffb42ae1896f13f7c7479a0b46a28b6f55540f89444f63de0378e3d121be09e06cc9ded1c20e65876d36aa0c65e9645644786b620e2dd2ad648ddfcbf4a7e5b1a3a4ecfe7f64667a3f0b7e2f4418588ed35a2458cffeb39b93d26f18d2ab13bdce6aee58e7b99359ec2dfd95a9c16dc00d6ef18b7933a6f8dc65ccb55667138776f7dea101070dc8796e3774df84f40ae0c8229d0d6069e5c8f39a7c299677a09d367fc7b05e3bc380ee652cdc72595f74c7b1043d0e1ffbab734648c838dfb0527d971b602bc216c9619ef0abf5ac974a1ed57f4050aa510dd9c74f508277b39d7973bb2dfccc5eeb0618db8cd74046ff337f0a7bf2c8e03e10f642c1886798d71806ab1e888d9e5ee87d0838c5655cb21c6cb83313b5a631175dff4963772cce9108188b34ac87c81c41e662ee4dd2dd7b2bc707961b1e646c4047669dcb6584f0d8d770daf5d7e7deb2e388ab20e2573d171a88108e79d820e98f26c0b84aa8b2f4aa4968dbb818ea32293237c50ba75ee485f4c22adf2f741400bdf8d6a9cc7df7ecae576221665d7358448818bb4ae4562849e949e17ac16e0be16688e156b5cf15e098c627c0056a90000000000000000000000000000000000000000000000000000000000000000'
    it('exit return tx', async () => {
        const result = await erc20Child.withdrawExit('0x2df7caedb9a28b3110a43d5380c19d8f7d3a177aad4c8c11a07cbc46ce377654', {
            returnTransaction: true
        });
        expect(result['data']).equal(
            exitData
        );
        const bridge = await abiManager.getConfig("Main.zkEVMContracts.BridgeProxy")
        expect(result['to'].toLowerCase()).equal(bridge.toLowerCase());
        expect(result).to.have.property('data');
    });

    // CHILD TRANSFER FLOW
    it('child transfer', async () => {
        const oldBalance = await erc20Child.getBalance(to);
        console.log('oldBalance', oldBalance);
        const amount = 9;
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
        const erc20ChildToken = hermezClientForTo.erc20(erc20.child);

        result = await erc20ChildToken.transfer(amount, to);
        txHash = await result.getTransactionHash();
        txReceipt = await result.getReceipt();
    });

    if (process.env.NODE_ENV !== 'test_all') return;

    // APPROVE FLOW
    it('approve', async () => {
        const result = await erc20Parent.approve('10');

        const txHash = await result.getTransactionHash();
        expect(txHash).to.be.an('string');

        const txReceipt = await result.getReceipt();
        console.log("txReceipt", txReceipt);
        expect(txReceipt.type).equal(2);

        const allowance = await erc20Parent.getAllowance(from);
        expect(allowance).to.be.an('string');
        expect(Number(allowance)).eq(10);
    });

    // DEPOSIT FLOW
    it('deposit', async () => {
        const spenderAddress = await erc20Parent.getBridgeAddress();

        const oldBalanceforUser = await erc20Child.getBalance(from);
        console.log('oldBalanceforUser', oldBalanceforUser);

        const oldBalanceforBridge = await erc20Child.getBalance(spenderAddress);
        console.log('oldBalanceforBridge', oldBalanceforBridge);

        const result = await erc20Parent.deposit('10', from);

        const txHash = await result.getTransactionHash();
        expect(txHash).to.be.an('string');

        const txReceipt = await result.getReceipt();
        expect(txReceipt).to.be.an('object');

        const newBalanceforUser = await erc20Child.getBalance(from);
        console.log('newBalanceforUser', newBalanceforUser);

        const newBalanceforBridge = await erc20Child.getBalance(spenderAddress);
        console.log('newBalanceforBridge', newBalanceforBridge);

        expect(oldBalanceforUser.toString()).equal(
            new BN(newBalanceforUser).add(new BN(10)).toString()
        )

        expect(newBalanceforBridge.toString()).equal(
            new BN(oldBalanceforBridge).add(new BN(10)).toString()
        )
    });

});
