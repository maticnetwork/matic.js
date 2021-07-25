const { getMaticPOSClient, pos, from } = require('../../utils')

const token = pos.parent.erc1155

const execute = async () => {
  try {
    const tx = await getMaticPOSClient().depositSingleERC1155ForUser(
      token,
      from,
      '123', // token id
      '1', // amount
      [], // optional bytes
      {
        from: from,
        gasPrice: '900000000000',
        gas: '550000',
      }
    )
    console.log(tx.transactionHash) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}

execute().then(() => process.exit(0))
