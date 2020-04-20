const Matic = require('@maticnetwork/maticjs/dist/index').default
async function getMaticClient() {
  const matic = new Matic({
    maticProvider: 'https://testnetv3.matic.network',
    parentProvider: 'https://ropsten.infura.io/v3/70645f042c3a409599c60f96f6dd9fbc',
    rootChain: '0x82a72315E16cE224f28E1F1fB97856d3bF83f010',
    registry: '0x56B082d0a590A7ce5d170402D6f7f88B58F71988',
    depositManager: '0x3Bc6701cA1C32BBaC8D1ffA2294EE3444Ad93989',
    withdrawManager: '0x3cf9aD3395028a42EAfc949e2EC4588396b8A7D4',
  })
  await matic.initialize()
  // const wallet = matic.web3Client.getWallet()
  // const parent = matic.web3Client.getParentWeb3()
  return matic
}

getMaticClient().then(console.log)
