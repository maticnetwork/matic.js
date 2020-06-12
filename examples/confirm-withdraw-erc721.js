const utils = require('./utils')

async function execute() {
  const { matic, network } = await utils.getMaticClient()
  const { from } = utils.getAccount()

  // provide the burn tx hash
  const txHash = '<>'
  console.log(await matic.withdrawNFT(txHash, { from, gas: '2000000' }))

  // May use this to get Withdraw events from the child token contract
  // const c = matic.getERC721TokenContract(network.Matic.Contracts.Tokens.RootERC721)
  // const events = await c.getPastEvents('Withdraw', { fromBlock: 0, toBlock: 'latest'})
  // console.log(events)
}

execute().then(_ => process.exit(0))
