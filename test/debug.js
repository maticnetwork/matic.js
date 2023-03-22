const { setProofApi, POSClient, ZkEvmClient, use, Converter } = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-web3");

const HDWalletProvider = require("@truffle/hdwallet-provider");
const { toBuffer } = require("ethereumjs-util");
const { user1, rpc, pos, zkEvm, user2 } = require("./config");
use(Web3ClientPlugin);
const from = user1.address;
const to = user2.address;

const execute = async () => {
  // return console.log(
  //   Converter.toHex('matic-bor-receipt-'),
  //   Buffer.from('matic-bor-receipt-', 'utf-8'),
  //   toBuffer(Converter.toHex('matic-bor-receipt-'))
  // )


  const privateKey = user1.privateKey;
  const mumbaiERC20 = pos.child.erc20;
  const goerliERC20 = pos.parent.erc20;

  const client = new POSClient();


  await client.init({
    log: true,
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new HDWalletProvider(privateKey, rpc.pos.parent),
      defaultConfig: {
        from
      }
    },
    child: {
      provider: new HDWalletProvider(privateKey, rpc.pos.child),
      defaultConfig: {
        from
      }
    }
  });
  console.log("init called");

  const mumbaiERC20Token = client.erc20(mumbaiERC20);
  const goerliERC20Token = client.erc20(goerliERC20, true);
  const goerliERC721Token = client.erc721(pos.parent.erc721, true);
  const mumbaiERC721Token = client.erc721(pos.child.erc721);
  const goerliERC1155Token = client.erc1155(pos.parent.erc1155, true);
  const mumbaiERC1155Token = client.erc1155(pos.child.erc1155);

  // setProofApi("https://proof-generator.polygon.technology");

  var result = await goerliERC1155Token.isWithdrawExited('0xbc48c0ccd9821141779a200586ef52033a3487c4e1419625fe7a0ea984521052', {
    returnTransaction: true
  });
  // var result = await goerliERC20Token.withdrawExit('0x1c20c41b9d97d1026aa456a21f13725df63edec1b1f43aacb180ebcc6340a2d3', {
  //   returnTransaction: true
  // });

  return console.log('result', result);

  // return console.log(await client.isDeposited('0x05b6d0d2280557c04de48d395f1f4ea9deb498fabb9bb09b9aec929db5ce62fa'));


  var tx = await mumbaiERC20Token.getAllowance(from);
  return console.log('isapp', tx);
  var tx = await goerliERC1155Token.deposit({
    amount: 10,
    tokenId: 123,
    userAddress: from
  }, {
    returnTransaction: true
  });

  return console.log('tx', tx);

  console.log("hash", await tx.getTransactionHash());
  console.log("receipt", await tx.getReceipt());

  return;

  // const tokens = await goerliERC721Token.getAllTokens(
  //   from
  // );
  // return console.log("tokens", tokens);

  // const tx = await goerliERC721Token.approveAll({
  //   // maxPriorityFeePerGas: 2000000000,
  //   // returnTransaction: true
  // });

  // var tx = await goerliERC20Token.getAllowance(from, {
  //   // returnTransaction: true
  // });

  // return console.log('tx', tx);


  var tx = await goerliERC20Token.deposit(1000000000, from, {
    // returnTransaction: true
  });
  // var tx = await mumbaiERC20Token.transfer(10,to,{
  //   // returnTransaction: true
  // });
  // setProofApi("https://proof-generator.polygon.technology")

  // var result = await service.network.getBlockIncluded("testnet", 1000);

  // return console.log("result", result);

  // const tx = await goerliERC20Token.withdrawExitFaster(
  //   '0x1c20c41b9d97d1026aa456a21f13725df63edec1b1f43aacb180ebcc6340a2d3', {
  //   returnTransaction: true
  // });

  console.log('tx', tx);
  // // setProofApi("https://proof-generator.polygon.technology")
  // // const tx = await goerliERC20Token.withdrawExit('0xd6f7f4c6052611761946519076de28fbd091693af974e7d4abc1b17fd7926fd7');
  console.log("txHash", await tx.getTransactionHash());
  console.log("txReceipt", await tx.getReceipt());

  //txhash to plasma exit - 0x63aa095e0d6ee8698399b871daa202eb5522933e2d94c5929cf0fb86b6b0c628
  const tokenId = '60399350241383852757821046101235634991156913804166740995010931519407953501076'

  // const tx = await (client['client_']).child.getTransactionCount(from, 'pending');
  // console.log("tx", tx);
  // const result = await client.isCheckPointed('0x41162584974896bfc96d91e7ce72009373cd31acabe92024950831ee7b8067c0')
  // console.log("result", result);
  // const tx = await goerliERC721Token.withdrawChallenge(
  //   '0x41162584974896bfc96d91e7ce72009373cd31acabe92024950831ee7b8067c0',
  //   {
  //     // nonce: 11793,
  //     // gasPrice: '1000',
  //     // gas: 10000,
  //     // returnTransaction: true,
  //     // gasPrice: '4000000000',
  //     // returnTransaction: true,
  //     gasLimit: 1046107,
  //   }
  // );
  // console.log("tx", tx)
  // console.log("txHash", await tx.getTransactionHash());
  // console.log("txReceipt", await tx.getReceipt());
}

const executeZkEvm = async () => {
  const privateKey = user1.privateKey;
  const blueberryERC20 = zkEvm.child.erc20;
  const goerliERC20 = zkEvm.parent.erc20;

  const blueberryEther = zkEvm.child.ether;
  const goerliEther = zkEvm.parent.ether;

  const client = new ZkEvmClient();

  await client.init({
    log: true,
    network: 'testnet',
    version: 'blueberry',
    parent: {
      provider: new HDWalletProvider(privateKey, rpc.zkEvm.parent),
      defaultConfig: {
        from
      }
    },
    child: {
      provider: new HDWalletProvider(privateKey, rpc.zkEvm.child),
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

  // // transfer Ether
  // var tx = await blueberryEtherToken.transfer("1", from, {returnTransaction: true});
  // return console.log("hash",  tx);

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
