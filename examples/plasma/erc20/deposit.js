const { getMaticPlasmaClient, plasma, from } = require('../../utils')

const amount = '1000000000000000' // amount in wei
const token = plasma.parent.erc20
async function execute() {
  const { matic } = await getMaticPlasmaClient()
  // get approved first
  await matic.approveERC20TokensForDeposit(token, amount, { from, gasPrice: '10000000000' })
  // then deposit
  return matic.depositERC20ForUser(token, from, amount, { from, gasPrice: '10000000000' })
}

async function executeRaw() {
  // eslint-disable-line
  const { matic } = await getMaticPlasmaClient()
  const { from } = getAccount()

  // get approved first
  let txParams = await matic.approveERC20TokensForDeposit(token, amount, { from, encodeAbi: true })
  let serializedTx = utils.buildRawTransaction(txParams, user1.privateKey)
  await matic.web3Client.parentWeb3.eth.sendSignedTransaction(serializedTx)

  txParams = await matic.depositERC20ForUser(token, from, amount, { from, encodeAbi: true })
  serializedTx = utils.buildRawTransaction(txParams, user1.privateKey)
  return matic.web3Client.parentWeb3.eth.sendSignedTransaction(serializedTx)
}

execute()
  .then(console.log)
  .then(_ => {
    process.exit(0)
  })
