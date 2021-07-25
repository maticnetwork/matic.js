const { getMaticPOSClient, pos, from } = require('../../utils')

const amount = '1000000000000000' // amount in wei
const token = pos.child.erc20

const execute = async () => {
  try {
    const tx = await getMaticPOSClient().burnERC20(token, amount, {
      from: from,
      gasPrice: 900000000000,
      gas: 300000,
    })
    console.log(tx) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}

execute().then(() => process.exit(0))
