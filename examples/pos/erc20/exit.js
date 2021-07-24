const { getMaticPOSClient, from } = require('../../utils')

const burnHash = '0xbadbf10a33ba5ae48cfa1660e011eb15bf927773610ace9466c71d14749d4132'

const execute = async () => {
  try {
    const tx = await getMaticPOSClient().exitERC20(burnHash, {
      from: from,
      gasPrice: 900000000000,
      gas: 400000,
    })
    console.log(tx.transactionHash) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}
execute().then(() => process.exit(0))
