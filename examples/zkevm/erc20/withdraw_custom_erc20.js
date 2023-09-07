const { getZkEvmClient, zkEvm, from } = require('../../utils_zkevm');

const execute = async () => {
  const client = await getZkEvmClient();
  const erc20TokenAddress = "0x20e8337597474636F95B68594EcB8DADeC4d3604";
  const erc20Token = client.erc20(erc20TokenAddress, false, zkEvm.child.bridgeAdapter);
  /**
   * Make sure the sufficient spending approval is done
   */
  const result = await erc20Token.withdrawCustomERC20("1000000000000000000", from, true);
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
