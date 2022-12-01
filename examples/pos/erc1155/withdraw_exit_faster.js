const { pos } = require('../../config');
const { getPOSClient } = require('../../utils_pos');

const execute = async () => {
  const client = await getPOSClient();
  const erc1155Token = client.erc1155(pos.parent.erc1155, true);

  const result = await erc1155Token.withdrawExitFaster('0xa8b8474b30c6d6fea7db7b9aaa8a3d4e11969ffed0b94dbcf5c39d921c73fb85');

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