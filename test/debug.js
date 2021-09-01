const { use, Web3Plugin, PlasmaClient, POSClient, ProofUtil } = require("@maticnetwork/maticjs");
// return console.log("BaseToken", ProofUtil, use);

const HDWalletProvider = require("@truffle/hdwallet-provider");
const { user1, plasma, rpc, pos } = require("./config");

// use(Web3Plugin);
const from = user1.address;

const execute = async () => {
  const privateKey = user1.privateKey;
  const mumbaiERC721 = pos.child.erc20;
  const goerliERC721 = pos.parent.erc20;
  const matic = new POSClient({
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

  const tx = await matic.erc20(mumbaiERC721).withdrawStart(
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
