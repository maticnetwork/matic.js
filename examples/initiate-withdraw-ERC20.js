const bn = require('bn.js')

const utils = require('./utils')

async function execute() {
  const { matic, network } = await utils.getMaticClient('beta', 'v2')
  matic.setWallet(utils.getPrivateKey())

  const token = network.Matic.Contracts.Tokens.TestToken
  const amount = new bn(10).pow(new bn(17)) // 0.1 token
  return matic.startWithdraw(token, amount, { from: process.env.FROM })
}

execute().then(console.log)
