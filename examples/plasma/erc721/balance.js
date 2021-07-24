const { getMaticPlasmaClient, from, plasma } = require('../../utils')

const execute = async () => {
  const { matic } = await getMaticPlasmaClient()
  const balance = await matic.balanceOfERC721(from, plasma.child.erc721, {})
  console.log('balance', balance)
}

execute().then(_ => {
  process.exit(0)
})
