const bn = require('bn.js')

const utils = require('./utils')

async function execute() {
  const { matic } = await utils.getMaticClient('testnet', 'v3')
  matic.setWallet(utils.getPrivateKey())

  const amount = new bn(10).pow(new bn(17)) // 0.1 token
  return matic.transferMatic(process.env.FROM, amount, { from: process.env.FROM })
}

execute().then(console.log)
