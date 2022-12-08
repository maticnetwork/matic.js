// const dotenv = require('dotenv');
// const path = require('path');
// dotenv.config({
//     path: path.join(__dirname, '.env')
// });
module.exports = {
    rpc: {
        pos: {
            parent: process.env.GOERLI_ROOT_RPC,
            child: process.env.MATIC_RPC || 'https://rpc-mumbai.matic.today',
        },
        hermez: {
            parent: process.env.GOERLI_ROOT_RPC,
            child: process.env.HERMEZ_RPC || 'https://rpc.public.zkevm-test.net',
        },
    },
    pos: {
        parent: {
            // erc20: '0x3f152b63ec5ca5831061b2dccfb29a874c317502',
            erc20: '0x655f2166b0709cd575202630952d71e2bb0d61af',
            erc721: '0x16f7ef3774c59264c46e5063b1111bcfd6e7a72f',
            // erc721: '0x5a08d01e07714146747950CE07BB0f741445D1b8',
            erc1155: '0x2e3Ef7931F2d0e4a7da3dea950FF3F19269d9063',
            chainManagerAddress: '0xBbD7cBFA79faee899Eaf900F13C9065bF03B1A74', // Address of RootChainManager proxy for POS Portal
        },
        child: {
            erc721: '0xbD88C3A7c0e242156a46Fbdf87141Aa6D0c0c649',
            erc20: '0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1',
            // erc20: '0xA0D9f8282cD48d22Fd875E43Be32793124f8eD47',
            weth: '0x714550C2C1Ea08688607D86ed8EeF4f5E4F22323',
            erc1155: '0xA07e45A987F19E25176c877d98388878622623FA',
        },
    },
    hermez: {
        parent: {
            ether: '0x0000000000000000000000000000000000000000',
            // erc20: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6', // WETH
            // erc20: '0x5C221E77624690fff6dd741493D735a17716c26B' // DAI
            // erc20: '0x27b4861cf36453b9478cd5416426ca6fbd06f67a', // DAI TEMP
            // erc20: '0xe7e7ad60b75614829be79a3014c5c6aeb006e079', // UNI TEMP
            erc20: '0x4701Aa9471d7bfAc765D87dcb1Ea6BB23AD32733' // Polygon
        },
        child: {
            ether: '0x0000000000000000000000000000000000000000',
            // erc20: '0x270969e59d170fB576cBB5E254493e9bfB13684f', // WETH
            // erc20: '0x08bd5b6d0237FaAED3C5E04fB131de2f843aC756', // DAI
            erc20: '0x73DeceDCa3d3aD2fFdB7FD5afd819a11dbc297f5' // Polygon
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
