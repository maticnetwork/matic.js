export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  env: {
    // Will be available on both server and client
    MATIC_PROVIDER: 'https://testnet2.matic.network/',
    PARENT_PROVIDER:
      'https://ropsten.infura.io/v3/70645f042c3a409599c60f96f6dd9fbc',
    ROOTCHAIN_ADDRESS: '0x60e2b19b9a87a3f37827f2c8c8306be718a5f9b4',
    WITHDRAWMANAGER_ADDRESS: '0x4ef2b60cdd4611fa0bc815792acc14de4c158d22',
    MATIC_WETH_ADDRESS: '0x31074c34a757a4b9FC45169C58068F43B717b2D0',
    SYNCER_URL: 'https://matic-syncer2.api.matic.network/api/v1',
    WATCHER_URL: 'https://ropsten-watcher2.api.matic.network/api/v1',
  },
}
