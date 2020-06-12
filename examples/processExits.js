const utils = require('./utils')

async function execute() {
  const { matic, network } = await utils.getMaticClient()
  const { from } = utils.getAccount()

  const token = network.Main.Contracts.Tokens.MaticToken
  console.log(await matic.processExits(token, { from, gas: 7000000 }))

  // for batch process
  // console.log(await matic.processExits([
  //   network.Main.Contracts.Tokens.MaticToken,
  //   network.Main.Contracts.Tokens.TestToken,
  //   network.Main.Contracts.Tokens.RootERC721
  // ], { from, gas: 7000000 }))
}

execute().then(_ => process.exit(0))
