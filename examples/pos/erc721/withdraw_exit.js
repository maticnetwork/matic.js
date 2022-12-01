const { pos } = require('../../config');
const { getPOSClient, from } = require('../../utils_pos');

const execute = async () => {
  const client = await getPOSClient();
  const erc721Token = client.erc721(pos.parent.erc721, true);

  const result = await erc721Token.withdrawExit('0x53e6d80253b238d6190f5a9d5b2146b733a93b92fcd8e38686068571eee5fe18');

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