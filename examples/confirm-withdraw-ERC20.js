const utils = require('./utils')

async function execute() {
  const { matic } = await utils.getMaticClient()
  const { from } = utils.getAccount()

  // provide the burn tx hash
  const txHash = '<>'
  console.log(await matic.withdraw(txHash, { from, gas: '7000000' }))
}

execute().then(_ => process.exit(0))
