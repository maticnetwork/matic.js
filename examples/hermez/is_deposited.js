const { getHermezClient, from, hermez } = require('../utils_hermez');

const execute = async () => {
    const client = await getHermezClient();

    const isDeposited = await client.isDeposited('0x4cd97048e77215b93bbfeb1e5ee7eadef74cccba13de7cd286e55f17726385c2');

    console.log("isDeposited", isDeposited);
}
execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
})