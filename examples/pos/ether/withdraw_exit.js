const { getPOSClient, pos } = require('../../utils');

const burnHash = '0xbadbf10a33ba5ae48cfa1660e011eb15bf927773610ace9466c71d14749d4132'


const execute = async () => {
  const client = await getPOSClient();
  const erc20Token = client.erc20(pos.parent.erc20, true);

  const result = await erc20Token.withdrawExit(burnHash);

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