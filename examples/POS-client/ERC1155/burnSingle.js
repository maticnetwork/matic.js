const config = require('../config')
const utils = require('../utils')
const maticPOSClient = utils.getMaticPOSClient()

const execute = async () => {
  try {
    const tx = await maticPOSClient.isSingleERC1155ExitProcessed(
      '0xbfc70c164f6951d9c9f3f87f2d1361ff216eb3d6fe9571430bd3f0711847a782'
    )

    console.log(tx) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}
execute().then(() => process.exit(0))
