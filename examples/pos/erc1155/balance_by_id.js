const { pos } = require('../../config');
const { getPOSClient, from } = require('../../utils_pos');

const execute = async () => {
  const client = await getPOSClient();
  const erc1155Token = client.erc1155(pos.child.erc1155);
  const tokenId = '123'

  const result = await erc1155Token.getBalance(from, tokenId);

  console.log("result", result);

}
execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})