const { getZkEvmClient, zkEvm, from } = require('../../utils_zkevm');

const execute = async () => {
  const client = await getZkEvmClient();
  const erc20Token = client.erc20(zkEvm.parent.erc20, true);

  const result = await erc20Token.deposit(10, from, {
    from
  });

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