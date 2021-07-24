const { getMaticPOSClient, from, pos } = require('../../utils')

const execute = async () => {
  try {
    const maticPOSClient = getMaticPOSClient()
    const tx = await maticPOSClient.balanceOfERC20(from, pos.child.erc20, {})

    console.log(tx) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}
execute().then(() => process.exit(0))
