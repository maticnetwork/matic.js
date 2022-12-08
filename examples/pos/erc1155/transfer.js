const { pos } = require('../../config');
const { getPOSClient, to, from } = require('../../utils_pos');

const execute = async () => {
    const client = await getPOSClient();
    const erc1155Token = client.erc1155(pos.child.erc1155);
    const tokenId = '123'
    const amount = '1'
    const data = '0x5465737445524331313535'

    const result = await erc1155Token.transfer({
        tokenId,
        amount,
        from,
        to,
        data,
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