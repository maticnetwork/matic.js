const { getZkEvmClient, zkEvm, from } = require('../../utils_zkevm');

const execute = async () => {
  const client = await getZkEvmClient({
    parentBridgeAdapter: zkEvm.parent.bridgeAdapter,
    childBridgeAdapter:  zkEvm.child.bridgeAdapter,
  });
  const erc20TokenAddress = "0xCDB5456dCDFE09e7CB78BE79C8e4bF3C7498e217";
  const erc20Token = client.erc20(erc20TokenAddress);
  /**
   * Make sure the sufficient spending approval is done
   */
  const result = await erc20Token.depositCustomERC20("1000000000000000000", from, true);
  const txHash = await result.getTransactionHash();
  console.log("txHash", txHash); // 0x696941f6147702d9850ff9798f56543cb33ebc608d3d6c5987288b7c2fe3d868
  const receipt = await result.getReceipt();
  console.log("receipt", receipt);

}
execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})
