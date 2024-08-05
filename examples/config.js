const dotenv = require('dotenv');
const path = require('path');
const env = dotenv.config({
  path: path.join(__dirname, '.env')
});

if (env.error) {
  throw new Error("no env file found");
}

module.exports = {
  rpc: {
    pos: {
      parent: process.env.ROOT_RPC || 'https://rpc.sepolia.org',
      child: process.env.MATIC_RPC || 'https://rpc-amoy.polygon.technology',
    },
    zkEvm: {
      parent: process.env.ROOT_RPC || 'https://rpc.sepolia.org',
      child: process.env.ZKEVM_RPC || 'https://rpc.cardona.zkevm-rpc.com',
    },
  },
  pos: {
    parent: {
      erc20: '0xb480378044d92C96D16589Eb95986df6a97F2cFB',
      erc721: '0x421DbB7B5dFCb112D7a13944DeFB80b28eC5D22C',
      erc1155: '0x095DD31b6473c4a32548d2A5B09e0f2F3F30d8F1',
      chainManagerAddress: '0xb991E39a401136348Dee93C75143B159FabF483f',
    },
    child: {
      erc20: '0xf3202E7270a10E599394d8A7dA2F4Fbd475e96bA',
      erc721: '0x02f83d4110D3595872481f677Ae323D50Aa09209',
      erc1155: '0x488AfDFef019f511E343becb98B7c24ee02fA639',
    },
  },
  zkEvm: {
    parent: {
      ether: '0x0000000000000000000000000000000000000000',
      erc20: '0x3fd0A53F4Bf853985a95F4Eb3F9C9FDE1F8e2b53', // MATIC
    },
    child: {
      ether: '0x0000000000000000000000000000000000000000',
      erc20: '0x244f21e2cDB60e9B6C9aEbB96FFe04489831F881' // MATIC
    },
  },
  SYNCER_URL: 'https://testnetv3-syncer.api.matic.network/api/v1', // Backend service which syncs the Matic sidechain state to a MySQL database which we use for faster querying. This comes in handy especially for constructing withdrawal proofs while exiting assets from Plasma.
  WATCHER_URL: 'https://testnetv3-watcher.api.matic.network/api/v1', // Backend service which syncs the Matic Plasma contract events on Ethereum mainchain to a MySQL database which we use for faster querying. This comes in handy especially for listening to asset deposits on the Plasma contract.
  user1: {
    // '<paste your private key here>' - A sample private key prefix with `0x`
    privateKey: process.env.USER1_PRIVATE_KEY,
    //'<paste address belonging to private key here>', Your address
    address: process.env.USER1_FROM
  },
  user2: {
    address: process.env.USER2_FROM
  },
  proofApi: process.env.PROOF_API || 'https://proof-generator.polygon.technology/'
}
