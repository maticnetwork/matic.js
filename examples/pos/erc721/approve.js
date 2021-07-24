const config = require('../config')
const utils = require('../utils')
const maticPOSClient = utils.getMaticPOSClient()

const execute = async () => {
  try {
    const tx = await maticPOSClient.approveERC721TokensForDeposit(config.root.DERC721, config.user.tokenId, {
      from: config.user.address,
      gasPrice: '500000000000',
      gas: 2500000,
    })
    console.log(tx.transactionHash) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}
execute().then(() => process.exit(0))
