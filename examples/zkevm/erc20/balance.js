const { getZkEvmClient, zkEvm, from } = require('../../utils_zkevm');

const execute = async () => {
  const client = await getZkEvmClient();
  const erc20Token = client.erc20(zkEvm.child.erc20);

  const result = await erc20Token.getBalance(from);

  console.log("result", result);

}
execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})