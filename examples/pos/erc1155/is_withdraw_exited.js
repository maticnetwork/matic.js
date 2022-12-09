const { pos } = require('../../config');
const { getPOSClient } = require('../../utils_pos');

const execute = async () => {
    const client = await getPOSClient();
    const erc1155Token = client.erc1155(pos.child.erc1155);

    const result = await erc1155Token.isWithdrawExited('0x5af57b56e6cee0866c0331fb3867bc4e8253ab2a020ac66a41de50e8791a0314');

    console.log("isWithdrawExited", result);

}
execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
})