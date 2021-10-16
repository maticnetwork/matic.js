const { pos } = require('../../config');
const { getPOSClient, from } = require('../../utils');

const execute = async () => {
    const client = await getPOSClient();
    const erc721Token = client.erc721(pos.parent.erc721);

    const result = await erc721Token.getTokensCount(from);

    console.log("result", result);
}
execute().then(() => {
    process.exit(0);
})