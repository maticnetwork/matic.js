const { use, Web3Plugin, PlasmaClient } = require("@maticnetwork/maticjs");
const HDWalletProvider = require("@truffle/hdwallet-provider");

use(Web3Plugin);
const env = process.env;
const from = env.user1_address

const execute = async () => {
  const privateKey = process.env.user1_privateKey;
  const erc20TokenMumbaiAddress = env.PLASMA_MUMBAI_ERC20;
  const goerliTokenERC20 = env.PLASMA_GOERLI_ERC20
  const matic = new PlasmaClient({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new HDWalletProvider(privateKey, env.PARENT_PROVIDER),
      defaultConfig: {
        from
      }
    },
    child: {
      provider: new HDWalletProvider(privateKey, env.MATIC_PROVIDER),
      defaultConfig: {
        from
      }
    }
  });

  const childErc20 = matic.erc20(erc20TokenMumbaiAddress);

  const balance = await childErc20.getBalance(from);
  console.log('balance', balance);

  // const rootTokenErc20 = matic.erc20(goerliTokenERC20);
  // const result = await rootTokenErc20.approve(
  //   '1000000000000000'
  // );
  // console.log("approve result", result);
  // console.log("result", result, result.on);

  // result.onError = function () {
  //   console.log("error args", arguments);
  // }
  // result.onTransactionHash = function () {
  //   console.log("transaction hash args", arguments);
  // }
  // result.onReceipt = function(){
  //   console.log("onReceipt hash args", arguments);
  // }
}

execute().then(_ => {
  process.exit(0)
})
