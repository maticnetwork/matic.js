const { getZkEvmClient, zkEvm, from } = require('../../utils_zkevm');
const transactionHash = '0x3ce9d872a615ee7c1e78a528d9c3a75bbd4969ce5c4329e665736331fd307f15';

const execute = async () => {
  const client = await getZkEvmClient();
  const erc20Token = client.erc20(zkEvm.parent.erc20, true);

  const result = await erc20Token.withdrawExit(transactionHash);

  const txHash = await result.getTransactionHash();
  console.log("txHash", txHash);
  const receipt = await result.getReceipt();
  console.log("receipt", receipt);

}
execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})