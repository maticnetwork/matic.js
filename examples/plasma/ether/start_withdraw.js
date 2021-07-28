const { getMaticPlasmaClient, plasma, from } = require('../../utils')

const amount = '100000000000000000' // amount in wei (0.1 eth)
const token = plasma.child.weth

const execute = async () => {
  const { matic } = await getMaticPlasmaClient()
  try {
    const tx = await matic.startWithdraw(token, amount, {
      from: from,
    })
    console.log(tx.transactionHash) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}

execute().then(() => process.exit(0))
