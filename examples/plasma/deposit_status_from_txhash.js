const { getMaticPlasmaClient } = require('../utils')

const txHash = '0x8cff1ef2b198273fe7f9fb41918cd7e3e8d04c58650614af39b3086e1de1a7e6'

const execute = async () => {
  const { matic } = await getMaticPlasmaClient()
  await matic.depositStatusFromTxHash(txHash).then(res => {
    console.log(res) // eslint-disable-line
  })
}

execute().then(_ => {
  process.exit(0)
})
