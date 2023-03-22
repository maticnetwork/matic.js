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
        zkEvm: {
            parent: process.env.GOERLI_ROOT_RPC,
            child: process.env.ZKEVM_RPC || 'https://rpc.public.zkevm-test.net',
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
    zkEvm: {
        parent: {
            ether: '0x0000000000000000000000000000000000000000',
            // erc20: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', // WETH
            // erc20: '0xD7E55eB808693D5Ff81a3391c59886C7E0449f35' // DAI
            // erc20: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', // UNI
            erc20: '0x4701Aa9471d7bfAc765D87dcb1Ea6BB23AD32733' // MATIC
        },
        child: {
            ether: '0x0000000000000000000000000000000000000000',
            // erc20: '0x3ce1bab7b7bAE26775F81Ee3576a99f0EAd5B33C', // WETH
            // erc20: '0x0cdA85ADE5C84C386B69b562d1722642748DD194', // DAI
            // erc20: '0x378588D64A464d61c646e5e86F4DA5277e65802C', // UNI
            erc20: '0x244f21e2cDB60e9B6C9aEbB96FFe04489831F881' // MATIC
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
