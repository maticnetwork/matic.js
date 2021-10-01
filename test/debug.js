const { PlasmaClient, POSClient } = require("@maticnetwork/maticjs");

const HDWalletProvider = require("@truffle/hdwallet-provider");
const { user1, plasma, rpc, pos } = require("./config");

const from = user1.address;

const execute = async () => {
  const privateKey = user1.privateKey;
  const mumbaiERC720 = plasma.child.erc20;
  const goerliERC720 = plasma.parent.erc20;

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

  const mumbaiERC720Token = client.erc20(mumbaiERC720);
  const goerliERC720Token = client.erc20(goerliERC720, true);


  // const balance = await mumbaiERC720Token.getBalance(from);
  // return console.log("balance", balance);

  const tx = await goerliERC720Token.approve(10, from);
  // // const tx = await goerliERC720Token.withdrawExit('0x454f159823351b24ce0e675e7b308cc8c7ba39e175059a4d2b8f9507c17b5133');
  console.log("txHash", await tx.getTransactionHash());
  console.log("txReceipt", await tx.getReceipt());

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

execute().then(_ => {
  process.exit(0)
}).catch(err => {
  console.error(err);
  process.exit(0);
})
