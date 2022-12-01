const { pos } = require('../../config');
const { getPOSClient, from } = require('../../utils_pos');

const execute = async () => {
    const client = await getPOSClient();
    const erc721Token = client.erc721(pos.child.erc721);

    const result = await erc721Token.getAllTokens(from, 2);

    console.log("result", result);
}
execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
})