const { use, Web3Plugin, PlasmaClient } = require("@maticnetwork/maticjs");
const HDWalletProvider = require("@truffle/hdwallet-provider");

use(Web3Plugin);
const env = process.env;
const from = env.user1_address

const execute = async () => {
  const privateKey = process.env.user1_privateKey;
  const erc20TokenAddress = env.PLASMA_MUMBAI_ERC20;
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

  // const balance = await matic.erc20.getBalance(env.PLASMA_MUMBAI_ERC20, from)
  // console.log('balance', balance)

  const result = matic.erc20.approve(erc20TokenAddress, '1000000000000000');
  console.log("result", result, result.on);

  await result;
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
