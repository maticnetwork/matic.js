const { getZkEvmClient, zkEvm, from } = require('../../utils_zkevm');
const depositCustomERC20Hash = "0x696941f6147702d9850ff9798f56543cb33ebc608d3d6c5987288b7c2fe3d868"; // this tx hash is already claimed

const execute = async () => {
  const client = await getZkEvmClient({
    parentBridgeAdapter: zkEvm.parent.bridgeAdapter,
    childBridgeAdapter:  zkEvm.child.bridgeAdapter,
  });
  const erc20TokenAddress = "0xCDB5456dCDFE09e7CB78BE79C8e4bF3C7498e217";
  const erc20Token = client.erc20(erc20TokenAddress);

  const result = await erc20Token.customERC20DepositClaim(depositCustomERC20Hash);
  const txHash = await result.getTransactionHash();
  console.log("txHash", txHash); // 0x20b7280557cfa22c2a3eebf8ef3124c6dbfc30691bd29786f0d653e8c8eb1d98
  const receipt = await result.getReceipt();
  console.log("receipt", receipt);

}
execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})
