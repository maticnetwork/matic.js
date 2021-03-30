const { toWei } = require('web3-utils')

const utils = require('./utils')

async function execute() {
  const { matic, network } = await utils.getMaticClient()
  const { from } = utils.getAccount()

  // burning erc721 tokens are also supported
  const token = network.Matic.Contracts.Tokens.MaticToken

  // or provide the tokenId in case of an erc721
  const amount = toWei('5.678')
  console.log(await matic.startWithdraw(token, amount, { from }))
}

execute().then(_ => process.exit(0))
