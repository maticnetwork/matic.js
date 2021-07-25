const { getMaticPOSClient } = require('../../utils')

const burnHash = '0xbadbf10a33ba5ae48cfa1660e011eb15bf927773610ace9466c71d14749d4132'

const execute = async () => {
  try {
    const tx = await getMaticPOSClient().exitERC721(burnHash)
    console.log(tx.transactionHash) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}

execute().then(() => process.exit(0))
