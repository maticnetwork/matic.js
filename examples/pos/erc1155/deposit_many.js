const { pos } = require('../../config');
const { getPOSClient, from } = require('../../utils_pos');

const execute = async () => {
  const client = await getPOSClient();
  const erc1155Token = client.erc1155(pos.parent.erc1155, true);
  const tokenIds = ['123']
  const amounts = [2]
  const data = '0x5465737445524331313535'

  const result = await erc1155Token.depositMany({
    amounts: amounts,
    tokenIds: tokenIds,
    userAddress: from,
    data,
  }, {
    from, 
    gasLimit: 450000,
    // gasPrice: 50000000000,
    maxPriorityFeePerGas: 6000000000, 
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