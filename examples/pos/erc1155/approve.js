const { getMaticPOSClient, pos, from } = require('../../utils')

const token = pos.parent.erc1155

const execute = async () => {
  try {
    const tx = await getMaticPOSClient().approveERC1155ForDeposit(token)
    console.log(tx.transactionHash) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}

execute().then(() => process.exit(0))
