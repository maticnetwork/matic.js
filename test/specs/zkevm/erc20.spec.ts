import { erc20, ether, from, zkEvmClient, zkEvmClientForTo, to, RPC, privateKey, toPrivateKey } from "./client";
import { expect } from 'chai'
import { ABIManager } from '@maticnetwork/maticjs'
import BN from "bn.js";
import { providers, Wallet } from "ethers";


describe('ERC20', () => {

    const parentPrivder = new providers.JsonRpcProvider(RPC.parent);
    const childProvider = new providers.JsonRpcProvider(RPC.child);

    let erc20Child = zkEvmClient.erc20(erc20.child);
    let erc20Parent = zkEvmClient.erc20(erc20.parent, true);

    let etherChild = zkEvmClient.erc20(ether.child);
    let etherParent = zkEvmClient.erc20(ether.parent, true);

    const abiManager = new ABIManager("testnet", "blueberry");
    before(() => {
        return Promise.all([
            zkEvmClient.init({
                // log: true,
                network: 'testnet',
                version: 'blueberry',
                parent: {
                    provider: new Wallet(privateKey, parentPrivder),
                    defaultConfig: {
                        from
                    }
                },
                child: {
                    provider: new Wallet(privateKey, childProvider),
                    defaultConfig: {
                        from
                    }
                }
            }),
            zkEvmClientForTo.init({
                // log: true,
                network: 'testnet',
                version: 'blueberry',
                parent: {
                    provider: new Wallet(toPrivateKey, parentPrivder),
                    defaultConfig: {
                        from: to
                    }
                },
                child: {
                    provider: new Wallet(toPrivateKey, childProvider),
                    defaultConfig: {
                        from: to
                    }
                }
            }),
            abiManager.init()
        ]);
    });

    // BALANCE
    it('get erc20 balance child', async () => {
        console.log('process.env.NODE_ENV', process.env.NODE_ENV);
        const balance = await erc20Child.getBalance(from);
        console.log('ERC20 balance child', balance);
        expect(balance).to.be.an('string');
        expect(Number(balance)).gte(0);
    })

    it('get erc20 balance parent', async () => {
        const balance = await erc20Parent.getBalance(from);
        console.log('ERC20 balance parent', balance);
        expect(balance).to.be.an('string');
        expect(Number(balance)).gte(0);
    })

    it('get ether balance child', async () => {
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
        console.log('allowance', allowance);
        expect(allowance).to.be.an('string');
        expect(Number(allowance)).gte(0);
    })

    it('get allowance child', async () => {
        const allowance = await erc20Child.getAllowance(from);
        console.log('allowance', allowance);
        expect(allowance).to.be.an('string');
        expect(Number(allowance)).gte(0);
    })

    // IS DEPOSIT CLAIMABLE
    it('is Deposit Claimable', async () => {
        const isDepositClaimable = await zkEvmClient.isDepositClaimable('0xeaa6af0ac116f3c7b20a583bd6187e1a0714a6be69e1738887ce1b380409eefe');
        console.log('isDepositClaimable', isDepositClaimable);
        expect(isDepositClaimable).to.be.an('boolean').equal(true);
    })

    // IS WITHDRAW EXITABLE
    it('is Withdraw Exitable', async () => {
        const isWithdrawExitable = await zkEvmClient.isWithdrawExitable('0x45f96efb6e58d61aafa4727caa2dca4fcaf441cedf82b83d2db7b14aa6f9ca2c');
        console.log('isWithdrawExitable', isWithdrawExitable);
        expect(isWithdrawExitable).to.be.an('boolean').equal(true);
    })

    // IS DEPOSITED
    it('is Deposited', async () => {
        const isDeposited = await zkEvmClient.isDeposited('0xab0cdd96a5524a061ace48e4a91974fca3edcd1ad14ee8d6e7c9b468666b0bfd');
        console.log('isDeposited', isDeposited);
        expect(isDeposited).to.be.an('boolean').equal(true);
    })

    // IS EXITED
    it('is Exited', async () => {
        const isExited = await zkEvmClient.isExited('0x27d52864c39601a722771acd89ec2f287905be84dd0678aca3cba00e59fa1982');
        console.log('isExited', isExited);
        expect(isExited).to.be.an('boolean').equal(false);
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
        expect(result).to.have.property('chainId', 1442);
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
    it('approval needed', async () => {
        const isApprovalNeeded = await erc20Parent.isApprovalNeeded();
        console.log('isApprovalNeeded', isApprovalNeeded);
        expect(isApprovalNeeded).to.be.an('boolean').equal(true);
    });

    it('approve parent return tx', async () => {
        const result = await erc20Parent.approve('10000', {
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
            const result = await erc20Child.approve('10', {returnTransaction: true});
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
        const result = await erc20Parent.getPermitData(10, {
            returnTransaction: true
        });
        expect(result).to.be.an('string');
    });

    // DEPOSIT
    it('deposit ether return tx', async () => {
        const result = await etherParent.deposit(10, from, {
            returnTransaction: true
        });

        const bridge = await abiManager.getConfig("Main.Contracts.PolygonZkEVMBridgeProxy")
        expect(result['to'].toLowerCase()).equal(bridge.toLowerCase());
        expect(Number(result['value'])).eq(10);
        expect(result).to.have.property('data');
    });

    it('deposit erc20 return tx', async () => {
        const result = await erc20Parent.deposit(1, from, {
            returnTransaction: true
        });

        const bridge = await abiManager.getConfig("Main.Contracts.PolygonZkEVMBridgeProxy")
        expect(result['to'].toLowerCase()).equal(bridge.toLowerCase());
        expect(result).to.have.property('data');
    });

    it('deposit erc20 with permit return tx', async () => {
        const result = await erc20Parent.depositWithPermit(10, from, {
            returnTransaction: true
        });

        const bridge = await abiManager.getConfig("Main.Contracts.PolygonZkEVMBridgeProxy")
        expect(result['to'].toLowerCase()).equal(bridge.toLowerCase());
        expect(result).to.have.property('data');
    });

    it('claim erc20 deposit return tx', async () => {
        const result = await erc20Child.depositClaim('0x27bbd4d96fc73c344bc1560ade28de1c4805802738beb772b995e14f41625623', {
            returnTransaction: true
        });
        const bridge = await abiManager.getConfig("zkEVM.Contracts.PolygonZkEVMBridge")
        expect(result['to'].toLowerCase()).equal(bridge.toLowerCase());
        expect(result).to.have.property('data');
    });

    // WITHDRAW
    it('erc20 withdraw return tx', async () => {
        const result = await erc20Child.withdraw('1', from, {
            returnTransaction: true
        });

        const bridge = await abiManager.getConfig("zkEVM.Contracts.PolygonZkEVMBridge")
        expect(result['to'].toLowerCase()).equal(bridge.toLowerCase());
        expect(result).to.have.property('data');
    });

    it('ether withdraw return tx', async () => {
        const result = await etherChild.withdraw('1', from, {
            returnTransaction: true
        });

        const bridge = await abiManager.getConfig("zkEVM.Contracts.PolygonZkEVMBridge")
        expect(result['to'].toLowerCase()).equal(bridge.toLowerCase());
        expect(Number(result['value'])).eq(1);
        expect(result).to.have.property('data');
    });

    it('exit return tx', async () => {
        const result = await erc20Parent.withdrawExit('0x27d52864c39601a722771acd89ec2f287905be84dd0678aca3cba00e59fa1982', {
            returnTransaction: true
        });
        const bridge = await abiManager.getConfig("Main.Contracts.PolygonZkEVMBridgeProxy")
        expect(result['to'].toLowerCase()).equal(bridge.toLowerCase());
        expect(result).to.have.property('data');
    });

    if (process.env.NODE_ENV !== 'test_all') return;

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
        expect(txReceipt.type).equal(0);
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
        const erc20ChildToken = zkEvmClientForTo.erc20(erc20.child);

        result = await erc20ChildToken.transfer(amount, to);
        txHash = await result.getTransactionHash();
        txReceipt = await result.getReceipt();
    });

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
        const amount = '1';
        const spenderAddress = await erc20Parent.getBridgeAddress();
        const oldBalanceforUser = await erc20Parent.getBalance(from);
        console.log('oldBalanceforUser', oldBalanceforUser);

        const oldBalanceforBridge = await erc20Parent.getBalance(spenderAddress);
        console.log('oldBalanceforBridge', oldBalanceforBridge);

        const result = await erc20Parent.deposit(amount, from);

        const txHash = await result.getTransactionHash();
        expect(txHash).to.be.an('string');

        const txReceipt = await result.getReceipt();
        expect(txReceipt).to.be.an('object');

        const newBalanceforUser = await erc20Parent.getBalance(from);
        console.log('newBalanceforUser', newBalanceforUser);

        const newBalanceforBridge = await erc20Parent.getBalance(spenderAddress);
        console.log('newBalanceforBridge', newBalanceforBridge);

        expect(oldBalanceforUser.toString()).equal(
            new BN(newBalanceforUser).add(new BN(amount)).toString()
        )

        expect(newBalanceforBridge.toString()).equal(
            new BN(oldBalanceforBridge).add(new BN(amount)).toString()
        )
    });

});
