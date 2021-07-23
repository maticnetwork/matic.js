const { child } = require('../config')
const { getMaticPlasmaClient, getAccount } = require('../utils')
const execute = async () => {
  const { matic } = await getMaticPlasmaClient()
  const { from } = getAccount()
  const balance = await matic.balanceOfERC20(from, child.erc20, {})
  console.log('balance', balance)
}

execute().then(_ => {
  process.exit(0)
})
