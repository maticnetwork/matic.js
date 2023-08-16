const { getZkEvmClient, zkEvm, from } = require('../../utils_zkevm');
const depositCustomERC20Hash = "0x696941f6147702d9850ff9798f56543cb33ebc608d3d6c5987288b7c2fe3d868"; // this tx hash is already claimed

const execute = async () => {
  const client = await getZkEvmClient({
    parentBridgeAdapter: zkEvm.parent.bridgeAdapter,
    childBridgeAdapter:  zkEvm.child.bridgeAdapter,
  });
  const erc20TokenAddress = "0x20e8337597474636F95B68594EcB8DADeC4d3604";
  const erc20Token = client.erc20(erc20TokenAddress);

  const result = await erc20Token.customERC20WithdrawExit(depositCustomERC20Hash);
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
