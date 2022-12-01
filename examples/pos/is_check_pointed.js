const { pos } = require('../config');
const { getPOSClient, from } = require('../utils_pos');

const execute = async () => {
    const client = await getPOSClient();

    const result = await client.isCheckPointed('0x54f47c891b460369661e22e27eeb4afbbb5dd792c7c8b48cab758892c14ffe85');

    console.log("result", result);
}
execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
})