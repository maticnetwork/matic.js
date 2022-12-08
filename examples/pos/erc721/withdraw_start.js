const { pos } = require('../../config');
const { getPOSClient, from } = require('../../utils_pos');

const execute = async () => {
  const client = await getPOSClient();
  const erc721Token = client.erc721(pos.child.erc721);

  const result = await erc721Token.withdrawStart('801', {
    // nonce: 11793,
    // returnTransaction: true,
    gasPrice: '4000000000',
  })

  console.log(result);

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