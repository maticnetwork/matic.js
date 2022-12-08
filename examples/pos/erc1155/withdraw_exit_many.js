const { pos } = require('../../config');
const { getPOSClient } = require('../../utils_pos');

const execute = async () => {
  const client = await getPOSClient();
  const erc1155Token = client.erc1155(pos.parent.erc1155, true);

  const result = await erc1155Token.withdrawExitMany('0xb727b6a972be840f0438ed8453122ca48d2570784cae83da794b3a68522dabbb');

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