const { getMaticPOSClient, pos, from } = require('../../utils')

const token = pos.child.erc721
const tokenId = '12'

const execute = async () => {
  try {
    const tx = await getMaticPOSClient().depositERC721ForUser(token, from, tokenId)
    console.log(tx.transactionHash) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}

execute().then(() => process.exit(0))
