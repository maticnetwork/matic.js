const { getHermezClient, hermez, from } = require('../../utils_hermez');

const execute = async () => {
  const client = await getHermezClient();
  const etherToken = client.erc20(hermez.parent.ether, true);
  const result = await etherToken.deposit(100, from);

  const txHash = await result.getTransactionHash();
  console.log("txHash", txHash);
  const receipt = await result.getReceipt();
  console.log("receipt", receipt);

};

execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})