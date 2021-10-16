const { pos } = require('../config');
const { getPOSClient, from } = require('../utils');

const execute = async () => {
    const client = await getPOSClient();

    const result = await client.isCheckPointed('0xf63a77f1b6435e5d89c8958d80b658350f74409188a8efa17d51044d3a32e1d0');

    console.log("result", result);
}
execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
})