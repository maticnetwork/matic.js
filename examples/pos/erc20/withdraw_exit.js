const { pos } = require('../../config');
const { getPOSClient, from } = require('../../utils_pos');

const execute = async () => {
  const client = await getPOSClient();
  const erc20Token = client.erc20(pos.parent.erc20, true);

  const result = await erc20Token.withdrawExit('0xb005d8db45f33836c422ee18286fa8ebe49b4ec7b9930e673d85ecd081cc3b8e');

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