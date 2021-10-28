// const dotenv = require('dotenv');
// const path = require('path');
// const env = dotenv.config({
//     path: path.join(__dirname, '.env')
// });
module.exports = {
    rpc: {
        parent: process.env.ROOT_RPC,
        child: process.env.MATIC_RPC || 'https://rpc-mumbai.matic.today',
    },
    pos: {
        parent: {
            erc20: '0x655f2166b0709cd575202630952d71e2bb0d61af',
            erc721: '0x5a08d01e07714146747950CE07BB0f741445D1b8',
            erc1155: '0x2e3Ef7931F2d0e4a7da3dea950FF3F19269d9063',
            chainManagerAddress: '0xBbD7cBFA79faee899Eaf900F13C9065bF03B1A74', // Address of RootChainManager proxy for POS Portal
        },
        child: {
            erc721: '0xEC8CB8bBb069470bC358ffB0e3710c64830da383',
            erc20: '0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1',
            weth: '0x714550C2C1Ea08688607D86ed8EeF4f5E4F22323',
            erc1155: '0xA07e45A987F19E25176c877d98388878622623FA',
        },
    },
    user1: {
        "privateKey": process.env.USER1_PRIVATE_KEY,
        "address": process.env.USER1_FROM
    },
    user2: {
        address: process.env.USER2_FROM, // Your address
        "privateKey": process.env.USER2_PRIVATE_KEY,
    },
}
