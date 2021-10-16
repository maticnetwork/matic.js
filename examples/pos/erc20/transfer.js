const { pos } = require('../../config');
const { getPOSClient, to } = require('../../utils');

const execute = async () => {
    const client = await getPOSClient();
    const erc720Token = client.erc20(pos.parent.erc20);

    const result = await erc720Token.transfer(to, 10, {
        gasPrice: '4000000000',
        nonce: 11795,
    });

    const txHash = await result.getTransactionHash();
    console.log("txHash", txHash);
    const receipt = await result.getReceipt();
    console.log("receipt", receipt);

}
execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
})