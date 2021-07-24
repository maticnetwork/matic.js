const { getMaticPlasmaClient, from, plasma } = require('../../utils')

const amount = '1000000000000000' // amount in wei
const token = plasma.child.erc20
async function execute() {
  const { matic } = await getMaticPlasmaClient()

  await matic
    .startWithdraw(token, amount, {
      from,
    })
    .then(res => {
      console.log(res) // eslint-disable-line
    })
}

execute().then(_ => {
  process.exit(0)
})
