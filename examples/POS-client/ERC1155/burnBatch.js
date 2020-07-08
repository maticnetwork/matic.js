const config = require('../config')
const utils = require('../utils')
const maticPOSClient = utils.getMaticPOSClient()

const execute = async () => {
  try {
    const tx = await maticPOSClient.burnBatchERC1155(
      config.child.DERC1155,
      [config.user.tokenId, config.user.tokenId2],
      [config.user.amount, config.user.amount2]
    )
    console.log(tx.transactionHash) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}

execute().then(() => process.exit(0))
