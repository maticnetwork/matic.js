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

  // const rootTokenErc20 = matic.erc20(goerliTokenERC20, true);
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
