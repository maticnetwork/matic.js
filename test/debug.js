const { use, Web3Plugin, PlasmaClient } = require("@maticnetwork/maticjs");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { user1, plasma, rpc } = require("./config");

use(Web3Plugin);
const from = user1.address;

const execute = async () => {
  const privateKey = user1.privateKey;
  const mumbaiERC721 = plasma.child.erc721;
  const goerliERC721 = plasma.parent.erc721;
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

  // console.log(matic.withdrawManager);

  /**
   * getBalance
   */
  const rootTokenErc721 = matic.erc721(goerliERC721, true);
  // const balanceRoot = await rootTokenErc721.getBalance(user1.address)
  // console.log('root bal start', balanceRoot, 'root bal end');

  const childTokenErc721 = matic.erc721(mumbaiERC721);
  // const balanceChild = await childTokenErc721.getBalance(user1.address)
  // console.log('child bal start', balanceChild, 'child bal end');

  /**
   * ownerByIndex
   */
  // const ownerByIndex = await rootTokenErc721.tokenOfOwnerByIndexERC721(user1.address, 0)
  // console.log('ownerofindex start', ownerByIndex, 'ownerofindex end');

  /**
   * deposit
   */
  // const safeDepositResult = await rootTokenErc721.safeDepositERC721(1981, { from: user1.address })
  // console.log('safeDeposit starts', safeDepositResult, 'safeDeposit ends');

  // const txHash = await safeDepositResult.getTransactionHash();
  // console.log("txHash", txHash);

  // const txReceipt = await safeDepositResult.getReceipt();
  // console.log("txReceipt", txReceipt);

  /**
   * withdraw
   */
  const startWithdrawForNFT = await childTokenErc721.startWithdrawForNFT(21)
  const txHash = await startWithdrawForNFT.getTransactionHash();
  console.log("txHash", txHash);

  const txReceipt = await startWithdrawForNFT.getReceipt();
  console.log("txReceipt", txReceipt);

}

execute().then(_ => {
  process.exit(0)
})
