const { pos } = require('../../config');
const { getPOSClient, from } = require('../../utils_pos');

const execute = async () => {
    const client = await getPOSClient();
    const erc721Token = client.erc721(pos.parent.erc721, true);

    const result = await erc721Token.getTokenIdAtIndexForUser(1, from);

    console.log("result", result);
}
execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
})