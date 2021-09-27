const { PlasmaClient, POSClient } = require("@maticnetwork/maticjs");

const HDWalletProvider = require("@truffle/hdwallet-provider");
const { user1, plasma, rpc, pos } = require("./config");

const from = user1.address;

const execute = async () => {
  const privateKey = user1.privateKey;
  const mumbaiERC720 = pos.child.erc20;
  const goerliERC720 = pos.parent.erc20;
  const posClient = new POSClient({
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


  await posClient.init();
  console.log("init called");

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

execute().then(_ => {
  process.exit(0)
}).catch(err => {
  console.error(err);
  process.exit(0);
})
