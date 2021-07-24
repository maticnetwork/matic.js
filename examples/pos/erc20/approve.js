const { pos, from, getMaticPOSClient } = require('../../utils')

const amount = '1000000000000000' // amount in wei
const erc20TokenOnParent = pos.parent.erc20
async function execute() {
  const maticPOSClient = getMaticPOSClient()
  const result = await maticPOSClient.approveERC20ForDeposit(erc20TokenOnParent, amount, { from })
  console.log(result)
}

execute().then(_ => {
  process.exit(0)
})
