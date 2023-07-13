const { POSClient, ZkEvmClient, use, Converter } = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-ethers");


const { providers, Wallet } = require("ethers");
const { user1, rpc, pos, zkEvm, user2 } = require("./config");
use(Web3ClientPlugin);
const from = user1.address;
const to = user2.address;

const execute = async () => {
    const privateKey = user1.privateKey;
    const mumbaiERC720 = pos.child.erc20;
    const goerliERC720 = pos.parent.erc20;

    const parentPrivder = new providers.JsonRpcProvider(rpc.pos.parent);
    const childProvider = new providers.JsonRpcProvider(rpc.pos.child);


    const posClient = new POSClient({
        network: 'testnet',
        version: 'mumbai',
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
    });

    await posClient.init();

    const mumbaiERC720Token = posClient.erc20(mumbaiERC720);
    const goerliERC720Token = posClient.erc20(goerliERC720, true);

    const balance = await mumbaiERC720Token.getBalance(from);
    return console.log("balance", balance);

    // const tx = await goerliERC720Token.deposit(10, from);
    // console.log("txHash", await tx.getTransactionHash());
    // console.log("txReceipt", await tx.getReceipt());

    // const tx = await mumbaiERC720Token.withdrawStart(
    //   10,
    //   {
    //     // nonce: 1974,
    //     // gasPrice: '1000',
    //     // gas: 100
    //   }
    // );
    // console.log("txHash", await tx.getTransactionHash());
    // console.log("txReceipt", await tx.getReceipt());
}

const executeZkEvm = async () => {
    const privateKey = user1.privateKey;
    const blueberryERC20 = zkEvm.child.erc20;
    const goerliERC20 = zkEvm.parent.erc20;

    const blueberryEther = zkEvm.child.ether;
    const goerliEther = zkEvm.parent.ether;

    const parentPrivder = new providers.JsonRpcProvider(rpc.zkEvm.parent);
    const childProvider = new providers.JsonRpcProvider(rpc.zkEvm.child);

    const client = new ZkEvmClient();

    await client.init({
        log: true,
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
    });
    console.log("init called");

    const blueberryERC20Token = client.erc20(blueberryERC20);
    const goerliERC20Token = client.erc20(goerliERC20, true);

    const blueberryEtherToken = client.erc20(blueberryEther);
    const goerliEtherToken = client.erc20(goerliEther, true);

    // setProofApi("https://bridge-api.public.zkevm-test.net/");

    // // isDepositClaimable
    // var result = await client.isDepositClaimable('0x6c8d9bb18c6d01f75a4900f0e46ed4179c04f96bfce1e8286313ab659c59cade');
    // return console.log('result', result);

    // // isDeposited
    // var result = await client.isDeposited('0x6c8d9bb18c6d01f75a4900f0e46ed4179c04f96bfce1e8286313ab659c59cade');
    // return console.log('result', result);

    // // isWithdrawExitable
    // var result = await client.isWithdrawExitable('0xc3567e692b7f2ad1f3da019c97c6b01483330f5b2cb022ae0d8fdccd4d1c0d60');
    // return console.log('result', result);

    // // isExited
    // var result = await client.isExited('0xc3567e692b7f2ad1f3da019c97c6b01483330f5b2cb022ae0d8fdccd4d1c0d60');
    // return console.log('result', result);

    // // getMappedTokenInfo
    // var result = await client.childChainBridge.getMappedTokenInfo("0", goerliERC20);
    // return console.log('result', result);

    // // getOriginTokenInfo
    // var result = await client.childChainBridge.getOriginTokenInfo(blueberryERC20);
    // return console.log('result', result);

    // // getBalance on goerli
    // var result = await goerliERC20Token.getBalance("0xFd71Dc9721d9ddCF0480A582927c3dCd42f3064C");
    // return console.log('result', result);

    // // getEtherBalance on goerli
    // var result = await goerliEtherToken.getBalance("0xFd71Dc9721d9ddCF0480A582927c3dCd42f3064C");
    // return console.log('result', result);

    // // getBalance on blueberry
    // var result = await blueberryERC20Token.getBalance("0xFd71Dc9721d9ddCF0480A582927c3dCd42f3064C");
    // return console.log('result', result);

    // // getAllowance
    // var result = await goerliERC20Token.getAllowance("0xFd71Dc9721d9ddCF0480A582927c3dCd42f3064C");
    // return console.log('result', result);

    // // approve
    // var tx = await goerliERC20Token.approve("10", {returnTransaction: true});
    // return console.log("hash", tx);

    // // deposit Ether
    // var tx = await goerliEtherToken.deposit("220000000000", from, {returnTransaction: true});
    // return console.log("hash", tx);

    // // claim Ether
    // var tx = await blueberryEtherToken.depositClaim("0xd2019abfdb978346cfc886525752b3d8a5798b8c474a46a8d18ed9b293bd5862", {returnTransaction: true});
    // return console.log("hash", tx);

    // // deposit ERC20
    // var tx = await goerliERC20Token.deposit("10", from, {returnTransaction: true});
    // return console.log("hash", tx);

    // // deposit claim ERC20
    // var tx = await blueberryERC20Token.depositClaim("0x080b05623d70c2858cb1fc64fd76cd04bde52a0a344d3cb896d33833ef221b12", {returnTransaction: true});
    // return console.log("hash", tx);

    // // Get Permit Data
    // var tx = await goerliERC20Token.getPermitData('2000000000000000000', {returnTransaction: false});
    // return console.log("hash", tx);

    // // deposit with Permit
    // var tx = await goerliERC20Token.depositWithPermit("10", from, {returnTransaction: true});
    // return console.log("hash", tx);

    // // withdraw Ether
    // var tx = await blueberryEtherToken.withdraw("1", from, {returnTransaction: true});
    // return console.log("hash",  tx);

    // // withdraw ERC20
    // var tx = await blueberryERC20Token.withdraw("1", from, {returnTransaction: true});
    // return console.log("hash", tx);

    // // withdraw exit ERC20
    // var tx = await goerliERC20Token.withdrawExit("0x2df7caedb9a28b3110a43d5380c19d8f7d3a177aad4c8c11a07cbc46ce377654", {returnTransaction: true});
    // return console.log("hash",  tx);

    // console.log("hash", await tx.getTransactionHash());
    // console.log("receipt", await tx.getReceipt());
}

executeZkEvm().then(_ => {
    process.exit(0)
}).catch(err => {
    console.error(err);
    process.exit(0);
})
