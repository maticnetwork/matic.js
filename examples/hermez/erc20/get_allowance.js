const { getHermezClient, hermez, from } = require('../../utils_hermez');

const execute = async () => {
    const client = await getHermezClient();
    const erc20Token = client.erc20(hermez.parent.erc20, true);

    const result = await erc20Token.getAllowance(from);

    console.log("result", result);

}
execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
})