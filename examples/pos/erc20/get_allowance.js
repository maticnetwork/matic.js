const { pos } = require('../../config');
const { getPOSClient, from } = require('../../utils');

const execute = async () => {
    const client = await getPOSClient();
    const erc720Token = client.erc20(pos.parent.erc20, true);

    const result = await erc720Token.getAllowance(from);

    console.log("result", result);

}
execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
})