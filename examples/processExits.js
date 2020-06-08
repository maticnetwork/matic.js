const utils = require('./utils')

async function execute() {
  const { matic, network } = await utils.getMaticClient()
  const { from } = utils.getAccount()

  const token = network.Main.Contracts.Tokens.MaticToken

  console.log(await matic.processExits(token, { from, gas: 3000000 }))
}

execute().then(_ => process.exit(0))
