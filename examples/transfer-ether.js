const bn = require('bn.js')

const utils = require('./utils')

async function execute() {
  const { matic } = await utils.getMaticClient('testnet', 'v3')
  matic.setWallet(utils.getPrivateKey())

  const amount = new bn(10).pow(new bn(17)) // 0.1 token
  return matic.transferEther(process.env.FROM, amount, { from: process.env.FROM, parent: true }) // performing a self-transfer
}

execute().then(console.log) // eslint-disable-line
