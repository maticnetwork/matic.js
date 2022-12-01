const { pos } = require('../../config');
const { getPOSClient, from } = require('../../utils_pos');

const execute = async () => {
  const client = await getPOSClient();
  const erc1155Token = client.erc1155(pos.parent.erc1155, true);

  const result = await erc1155Token.approveAllForMintable({
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