const { getHermezClient, from, hermez } = require('../utils_hermez');

const execute = async () => {
    const client = await getHermezClient();

    const isDeposited = await client.isDepositClaimable('0x48fe1e4f8c915d01ef13ccd7ac1e7cb6db1db15ea1d1df2e6fd8e957fe980dab');

    console.log("isDeposited", isDeposited);
}
execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
})