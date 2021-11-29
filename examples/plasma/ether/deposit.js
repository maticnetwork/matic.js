const { getMaticPlasmaClient, from } = require('../../utils')

const amount = '100000000000000000' // amount in wei (0.1 eth)

const execute = async () => {
  const { matic } = await getMaticPlasmaClient()
  try {
    const tx = await matic.depositEther(amount, {
      from: from,
    })
    console.log(tx.transactionHash) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}

execute().then(() => process.exit(0))
