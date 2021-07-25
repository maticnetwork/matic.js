const { getMaticPOSClient, pos, from } = require('../../utils')

const token = pos.parent.erc1155

const execute = async () => {
  try {
    const tx = await getMaticPOSClient().depositBatchERC1155ForUser(
      token,
      from,
      ['<tokenid1>', '<tokenid2>'],
      ['amount1', 'amount2']
    )
    console.log(tx.transactionHash) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}

execute().then(() => process.exit(0))
