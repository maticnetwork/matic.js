const { pos } = require('../config');
const { getPOSClient, from } = require('../utils');

const execute = async () => {
    const client = await getPOSClient();

    const isDeposited = await client.isDeposited('0x967ab5578a09d278db8b400354e874a0e5d38374db7b9edc42a3640fffdb3c7c');

    console.log("isDeposited", isDeposited);
}
execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
})