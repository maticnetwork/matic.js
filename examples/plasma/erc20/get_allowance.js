const {  plasma } = require('../../config');
const { getPlasmaClient, from } = require('../../utils');

const execute = async () => {
    const client = await getPlasmaClient();
    const erc720Token = client.erc20(plasma.parent.erc20, true);

    const result = await erc720Token.getAllowance(from);

    console.log("result", result);

}
execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
})