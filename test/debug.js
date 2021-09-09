const { use, EthersPlugin, PlasmaClient, POSClient, ProofUtil } = require("@maticnetwork/maticjs");
// return console.log("BaseToken", ProofUtil, use);

const HDWalletProvider = require("@truffle/hdwallet-provider");
const { user1, plasma, rpc, pos } = require("./config");
const { providers, Wallet } = require("ethers");

use(EthersPlugin);
const from = user1.address;

const execute = async () => {
  const privateKey = user1.privateKey;
  const mumbaiERC720 = pos.child.erc20;
  const goerliERC721 = pos.parent.erc20;
  // const matic = new POSClient({
  //   network: 'testnet',
  //   version: 'mumbai',
  //   parent: {
  //     provider: new HDWalletProvider(privateKey, rpc.parent),
  //     defaultConfig: {
  //       from
  //     }
  //   },
  //   child: {
  //     provider: new HDWalletProvider(privateKey, rpc.child),
  //     defaultConfig: {
  //       from
  //     }
  //   }
  // });
  const parentPrivder = new providers.JsonRpcProvider(rpc.parent);
  const childProvider = new providers.JsonRpcProvider(rpc.child);


  const matic = new POSClient({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new Wallet(privateKey, parentPrivder),
      defaultConfig: {
        from
      }
    },
    child: {
      provider: new Wallet(privateKey, childProvider),
      defaultConfig: {
        from
      }
    }
  });

  const mumbaiERC720Token = matic.erc20(mumbaiERC720);
  // return console.log("balance", await mumbaiERC720Token.getBalance(from));


  const tx = await mumbaiERC720Token.withdrawStart(
    10,
    {
      nonce: 1974,
      // gasPrice: '1000',
      // gas: 100
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
