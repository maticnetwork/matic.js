const { PlasmaClient, POSClient, use, Web3SideChainClient } = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-web3");

const HDWalletProvider = require("@truffle/hdwallet-provider");
const { user1, plasma, rpc, pos } = require("./config");
use(Web3ClientPlugin);
const from = user1.address;

const execute = async () => {
  const privateKey = user1.privateKey;
  const mumbaiERC720 = pos.child.erc721;
  const goerliERC720 = plasma.parent.erc721;

  const client = new PlasmaClient({
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


  await client.init();
  console.log("init called");

  // const mumbaiERC720Token = client.erc721('0x33fc58f12a56280503b04ac7911d1eceebce179c');
  const mumbaiERC720Token = client.erc721(plasma.child.erc721);
  const goerliERC720Token = client.erc721(plasma.parent.erc721, true);


  // const balance = await mumbaiERC720Token.getBalance(
  //   from
  // );
  // return console.log("balance", balance);

  // const tokens = await goerliERC720Token.getAllTokens(
  //   from
  // );
  // return console.log("tokens", tokens);

  // const tx = await goerliERC720Token.safeDeposit(104, from);
  // // const tx = await goerliERC720Token.withdrawChallenge('0x454f159823351b24ce0e675e7b308cc8c7ba39e175059a4d2b8f9507c17b5133');
  // console.log("txHash", await tx.getTransactionHash());
  // console.log("txReceipt", await tx.getReceipt());

  //txhash to plasma exit - 0x63aa095e0d6ee8698399b871daa202eb5522933e2d94c5929cf0fb86b6b0c628
  const tokenId = '60399350241383852757821046101235634991156913804166740995010931519407953501076'

  // const tx = await (client['client_']).child.getTransactionCount(from, 'pending');
  // console.log("tx", tx);
  // const result = await client.isCheckPointed('0x41162584974896bfc96d91e7ce72009373cd31acabe92024950831ee7b8067c0')
  // console.log("result", result);
  const tx = await goerliERC720Token.withdrawChallengeFaster(
    '0x41162584974896bfc96d91e7ce72009373cd31acabe92024950831ee7b8067c0',
    {
      // nonce: 11793,
      // gasPrice: '1000',
      // gas: 10000,
      // returnTransaction: true,
      // gasPrice: '4000000000'
    }
  );
  console.log("txHash", await tx.getTransactionHash());
  console.log("txReceipt", await tx.getReceipt());
}

execute().then(_ => {
  process.exit(0)
}).catch(err => {
  console.error(err);
  process.exit(0);
})
