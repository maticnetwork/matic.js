const { getMaticPOSClient, pos } = require('../../utils')

const token = pos.child.erc721
const tokenId = '60399350241383852757821046101235634991156913804166740995010931519407953501076'

const execute = async () => {
  try {
    const tx = await getMaticPOSClient().burnERC721(token, tokenId)
    console.log(tx.transactionHash) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}

execute().then(() => process.exit(0))
