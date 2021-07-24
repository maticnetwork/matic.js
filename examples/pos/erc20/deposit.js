const { getMaticPOSClient, from, pos } = require('../../utils')

const amount = '1000000000000000' // amount in wei
const token = pos.parent.erc20

const execute = async () => {
  try {
    const tx = await getMaticPOSClient().depositERC20ForUser(token, from, amount)
    console.log(tx.transactionHash) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}

execute().then(() => process.exit(0))
