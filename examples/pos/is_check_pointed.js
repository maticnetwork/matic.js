const { pos } = require('../config');
const { getPOSClient, from } = require('../utils');

const execute = async () => {
    const client = await getPOSClient();

    const result = await client.isCheckPointed('0xb005d8db45f33836c422ee18286fa8ebe49b4ec7b9930e673d85ecd081cc3b8e');

    console.log("result", result);
}
execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
})