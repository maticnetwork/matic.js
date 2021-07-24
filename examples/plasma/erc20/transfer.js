const { getMaticPlasmaClient, from, plasma, to } = require('../../utils')

const amount = '1000000000000000' // amount in wei
const token = plasma.child.erc20
const recipient = to
async function execute() {
  const { matic } = await getMaticPlasmaClient()

  await matic
    .transferERC20Tokens(token, recipient, amount, {
      from,
      // parent: true, // For token transfer on Main network (false for Matic Network)
    })
    .then(result => {
      console.log('hash', result) // eslint-disable-line
    })
}

execute().then(_ => {
  process.exit(0)
})
