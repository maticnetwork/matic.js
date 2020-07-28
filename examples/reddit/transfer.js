const bn = require('bn.js')

const utils = require('../utils')

async function execute() {
  const { matic, network } = await utils.getMaticClient()
  const { from } = utils.getAccount()

  // reddit token contract
  const childTokenAddress = ''
  const amount = matic.web3Client.web3.utils.toWei('1.23')
  const to = '<>'

  let bal = new bn(await matic.balanceOfERC20(from, childTokenAddress, { parent: false }))
  let toBal = new bn(await matic.balanceOfERC20(to, childTokenAddress, { parent: false }))
  console.log({ initialBalance: bal.toString(), toBal: toBal.toString() })

  let transfer = await matic.transferERC20Tokens(childTokenAddress, to, amount, { from, parent: false })
  console.log(transfer)
}

execute().then(_ => process.exit(0))
