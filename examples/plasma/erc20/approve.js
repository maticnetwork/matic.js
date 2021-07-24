const { getMaticPlasmaClient, plasma, from } = require('../../utils')

const amount = '1000000000000000' // amount in wei
const erc20TokenOnParent = plasma.parent.erc20
async function execute() {
  const { matic } = await getMaticPlasmaClient()
  const result = await matic.approveERC20TokensForDeposit(erc20TokenOnParent, amount, { from })
  console.log(result)
}

async function executeRaw() {
  // eslint-disable-line
  const { matic } = await getMaticPlasmaClient()
  const { from } = getAccount()
  const txParams = await matic.approveERC20TokensForDeposit(erc20TokenOnParent, amount, { from, encodeAbi: true })
  let serializedTx = utils.buildRawTransaction(txParams, user1.privateKey)
  return matic.web3Client.parentWeb3.eth.sendSignedTransaction(serializedTx)
}

execute().then(_ => {
  process.exit(0)
})
