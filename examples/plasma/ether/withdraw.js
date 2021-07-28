const { getMaticPlasmaClient, from } = require('../../utils')

// confirm withdraw Ether Plasma txHash
const txHash = '0x13a1a9e5d4c46eeb38efb6eccfb8fd534985dda5b11ba50f61abd39d83336d8c'

const execute = async () => {
  const { matic } = await getMaticPlasmaClient()
  try {
    const tx = await matic.withdraw(txHash, {
      from: from,
    })
    console.log(tx.transactionHash) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}

execute().then(() => process.exit(0))
