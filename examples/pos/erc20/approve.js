const { getMaticPOSClient } = require('../../utils')

const execute = async () => {
  try {
    const maticPOSClient = getMaticPOSClient()
    maticPOSClient.transferERC20Tokens()
    const tx = await maticPOSClient.approveERC20ForDeposit(config.root.DERC20, config.user.amount, {
      from: config.user.address,
      gasPrice: '900000000000',
      gas: '250000',
    })

    console.log(tx) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}
execute().then(() => process.exit(0))
