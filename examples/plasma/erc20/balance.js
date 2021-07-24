const { getMaticPlasmaClient, from, plasma } = require('../../utils')

const execute = async () => {
  const { matic } = await getMaticPlasmaClient()
  const balance = await matic.balanceOfERC20(from, plasma.child.erc20, {})
  console.log('balance', balance)
}

execute().then(_ => {
  process.exit(0)
})
