const { getMaticPOSClient, pos, from } = require('../../utils')

const token = pos.child.erc1155

const execute = async () => {
  try {
    const tx = await getMaticPOSClient().burnBatchERC1155(token[('<tokenId1>', '<tokenid2>')], [
      '<amount1>',
      '<amount2>',
    ])
    console.log(tx.transactionHash) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}

execute().then(() => process.exit(0))
