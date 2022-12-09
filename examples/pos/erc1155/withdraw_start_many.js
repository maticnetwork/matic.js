const { pos } = require('../../config');
const { getPOSClient } = require('../../utils_pos');

const execute = async () => {
  const client = await getPOSClient();
  const erc1155Token = client.erc1155(pos.child.erc1155);
  const tokenIds = ['123']
  const amounts = ['1']

  const result = await erc1155Token.withdrawStartMany(tokenIds, amounts)

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