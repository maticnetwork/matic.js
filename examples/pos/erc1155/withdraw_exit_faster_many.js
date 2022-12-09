const { pos } = require('../../config');
const { getPOSClient } = require('../../utils_pos');

const execute = async () => {
  const client = await getPOSClient();
  const erc1155Token = client.erc1155(pos.parent.erc1155, true);

  const result = await erc1155Token.withdrawExitFasterMany('0x1ce9c40b38086282f263ea7712d80f8a490e422e5171c70917fb6f0459f0fccf');

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