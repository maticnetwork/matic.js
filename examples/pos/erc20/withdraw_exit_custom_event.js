const { pos } = require('../../config');
const { getPOSClient, from } = require('../../utils_pos');

const execute = async () => {
  const client = await getPOSClient();
  const erc20Token = client.erc20(pos.parent.erc20, true);

  const burnEventSignature = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"

  const result = await erc20Token.withdrawExit('0x911403585328c9e1d8fa3354ed78b51772684bf755dda19d2658247924af473d', {
    burnEventSignature: burnEventSignature,
  });

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