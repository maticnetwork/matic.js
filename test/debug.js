const { use, Web3Plugin, PlasmaClient } = require("@maticnetwork/maticjs");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { user1, plasma, rpc } = require("./config");

use(Web3Plugin);
const from = user1.address;

const execute = async () => {
  const privateKey = user1.privateKey;
  const erc20TokenMumbaiAddress = plasma.child.erc20;
  const goerliTokenERC20 = plasma.parent.erc20;
  const matic = new PlasmaClient({
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

  // const childErc20 = matic.erc20(erc20TokenMumbaiAddress);

  // const balance = await childErc20.getBalance(from);
  // console.log('balance', balance);

  const rootTokenErc20 = matic.erc20(goerliTokenERC20, true);
  const approveResult = await rootTokenErc20.approve('1000000000000000');
  const txHash = await approveResult.getTransactionHash();
  console.log("txHash", txHash);
  const txReceipt = await approveResult.getReceipt();
  console.log("txReceipt", txReceipt);
  // const promise = rootTokenErc20.approve(
  //   '1000000000000000'
  // )
  // promise.on("txHash", (txHash) => {
  //   console.log("transaction hash args", txHash);
  // });
  // console.log("promise result", promise);
  // const result = await promise;
  // console.log("approve result", result);
}

execute().then(_ => {
  process.exit(0)
})
