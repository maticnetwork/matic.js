const { getMaticPlasmaClient, plasma, from } = require('../../utils')

// process exit on parent chain
const token = plasma.parent.weth

const execute = async () => {
  const { matic } = await getMaticPlasmaClient()
  try {
    const tx = await matic.processExits(token, {
      from: from,
    })
    console.log(tx.transactionHash) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}

execute().then(() => process.exit(0))
