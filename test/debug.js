const { use, Web3Plugin, PlasmaClient, POSClient } = require("@maticnetwork/maticjs");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { user1, plasma, rpc, pos } = require("./config");

use(Web3Plugin);
const from = user1.address;

const execute = async () => {
  const privateKey = user1.privateKey;
  // const erc20TokenMumbaiAddress = plasma.child.erc20;
  // const goerliTokenERC20 = plasma.parent.erc20;

  const erc20POSTokenMumbai = pos.child.erc20;
  const erc20POSTokenGoerli = pos.parent.erc20;

  const maticPlasma = new PlasmaClient({
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

  const maticPOS = new POSClient({
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

  // const childErc20 = maticPOS.erc20(erc20POSTokenMumbai);

  // const balance = await childErc20.getBalance(from);
  // console.log('balance', balance);

  const parentErc20 = maticPOS.erc20(erc20POSTokenGoerli, true);

  // const balance = await parentErc20.getBalance(from);
  // console.log('balance', balance);

  const approveResult = await parentErc20.approve('1000000000000000');
  console.log('txHash', await approveResult.getTransactionHash());
  console.log('receipt', await approveResult.getReceipt());



  // const childErc20 = matic.erc20(erc20TokenMumbaiAddress);

  // const balance = await childErc20.getBalance(from);
  // console.log('balance', balance);

  // const rootTokenErc20 = maticPlasma.erc20(goerliTokenERC20, true);
  // const approveResult = await rootTokenErc20.approve('1000000000000000');
  // const txHash = await approveResult.getTransactionHash();
  // console.log("txHash", txHash);
  // const txReceipt = await approveResult.getReceipt();
  // console.log("txReceipt", txReceipt);



}

execute().then(_ => {
  process.exit(0)
})
