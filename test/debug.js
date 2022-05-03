const { setProofApi, POSClient, use, Converter } = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-web3");

const HDWalletProvider = require("@truffle/hdwallet-provider");
const { toBuffer } = require("ethereumjs-util");
const { user1, rpc, pos, user2 } = require("./config");
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
      provider: new HDWalletProvider(privateKey, rpc.parent),
      defaultConfig: {
        from
      }
    },
    child: {
      provider: new HDWalletProvider(privateKey, rpc.child),
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

  // setProofApi("https://apis.matic.network");

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
  // setProofApi("https://apis.matic.network")

  // var result = await service.network.getBlockIncluded("testnet", 1000);

  // return console.log("result", result);

  // const tx = await goerliERC20Token.withdrawExitFaster(
  //   '0x1c20c41b9d97d1026aa456a21f13725df63edec1b1f43aacb180ebcc6340a2d3', {
  //   returnTransaction: true
  // });

  console.log('tx', tx);
  // // setProofApi("https://apis.matic.network")
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

execute().then(_ => {
  process.exit(0)
}).catch(err => {
  console.error(err);
  process.exit(0);
})
