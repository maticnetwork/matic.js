const { pos } = require('../../config');
const { getPOSClient } = require('../../utils_pos');

const execute = async () => {
    const client = await getPOSClient();
    const erc1155Token = client.erc1155(pos.child.erc1155);

    const result = await erc1155Token.isWithdrawExitedMany('0xb727b6a972be840f0438ed8453122ca48d2570784cae83da794b3a68522dabbb');

    console.log("isWithdrawExited", result);

}
execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
})