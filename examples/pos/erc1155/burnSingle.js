const config = require('../config')
const utils = require('../utils')
const maticPOSClient = utils.getMaticPOSClient()

const execute = async () => {
  try {
    let tx = await maticPOSClient.burnSingleERC1155(
      config.child.DERC1155, //token address
      '123', // id to burn
      '1' // amount of id token to burn
    )

    console.log(tx) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}
execute().then(() => process.exit(0))
