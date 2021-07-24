const { getMaticPOSClient, pos, from } = require('../../utils')

const token = pos.parent.erc721
const tokenId = '60399350241383852757821046101235634991156913804166740995010931519407953501076'

const execute = async () => {
  try {
    const tx = await getMaticPOSClient().approveERC721ForDeposit(token, tokenId, {
      from: from,
      gasPrice: '500000000000',
      gas: 2500000,
    })
    console.log(tx.transactionHash) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}
execute().then(() => process.exit(0))
