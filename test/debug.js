const { use, Web3Plugin, PlasmaClient } = require("@maticnetwork/maticjs");
const HDWalletProvider = require("@truffle/hdwallet-provider");

use(Web3Plugin);
const env = process.env;
const from = env.user1_address

const execute = async () => {
  const privateKey = process.env.user1_privateKey;
  const matic = new PlasmaClient({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new HDWalletProvider(privateKey, env.PARENT_PROVIDER),
    },
    child: {
      provider: new HDWalletProvider(privateKey, env.MATIC_PROVIDER),
    }
  });

  const balance = await matic.erc20.getBalance(from, env.PLASMA_MUMBAI_ERC20)
  console.log('balance', balance)
}

execute().then(_ => {
  process.exit(0)
})
