const { getHermezClient, hermez, from } = require('../../utils_hermez');

const execute = async () => {
  const client = await getHermezClient();
  const erc20Token = client.erc20(hermez.parent.erc20, true);

  const result = await erc20Token.deposit(10, from, {
    from,
    gasLimit: 300000,
    gasPrice: 50000000000,
    // maxPriorityFeePerGas: 6000000000, 
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