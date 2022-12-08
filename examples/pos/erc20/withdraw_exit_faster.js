const { setProofApi } = require("@maticnetwork/maticjs");
const { pos } = require('../../config');
const { getPOSClient, proofApi } = require('../../utils_pos');

setProofApi(proofApi);

const execute = async () => {
  const client = await getPOSClient();
  const erc20Token = client.erc20(pos.parent.erc20, true);

  const result = await erc20Token.withdrawExitFaster(
    '0x2ad031ed56a12f917d20e056c06b0d60bf83665b7ac26b8d40b1bef93f922fdc'
  );

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