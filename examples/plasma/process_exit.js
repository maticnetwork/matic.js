const { plasma } = require('../config')
const { getMaticPlasmaClient, from } = require('../utils')

const rootTokenAddress = plasma.parent.erc20

const execute = async () => {
  const { matic } = await getMaticPlasmaClient()
  await matic
    .processExits(rootTokenAddress, {
      from,
    })
    .then(res => {
      console.log(res) // eslint-disable-line
    })
}

execute().then(_ => {
  process.exit(0)
})
