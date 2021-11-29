const { pos } = require('../../config');
const { getPOSClient, from } = require('../../utils');

const execute = async () => {
  const client = await getPOSClient();
  const erc20Token = client.erc20(pos.child.erc20);

  const result = await erc20Token.getBalance(from);

  console.log("result", result);

}
execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})