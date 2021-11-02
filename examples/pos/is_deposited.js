const { pos } = require('../config');
const { getPOSClient, from } = require('../utils');

const execute = async () => {
    const client = await getPOSClient();

    const isDeposited = await client.isDeposited('0xc67599f5c967f2040786d5924ec55d37bf943c009bdd23f3b50e5ae66efde258');

    console.log("isDeposited", isDeposited);
}
execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
})