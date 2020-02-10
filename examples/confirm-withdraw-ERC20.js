const utils = require('./utils')

async function execute() {
  const { matic } = await utils.getMaticClient('beta', 'v2')
  matic.setWallet(utils.getPrivateKey())

  const txHash = '0xffbf65e00f3f9c75229e5e70a69fcb93d74ea7750a4170685193a4271ae270d4'
  return matic.withdraw(txHash, { from: process.env.FROM })
}

execute().then(console.log)
