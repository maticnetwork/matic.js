const utils = require('./utils')

async function execute() {
  const { matic, network } = await utils.getMaticClient()
  const { from } = utils.getAccount()

  const token = network.Main.Contracts.Tokens.RootERC721
  const tokenId = '0'

  await matic.approveERC20TokensForDeposit(token, tokenId)
  console.log(await matic.safeDepositERC721Tokens(token, tokenId, { from }))
}

execute().then(_ => process.exit(0))
