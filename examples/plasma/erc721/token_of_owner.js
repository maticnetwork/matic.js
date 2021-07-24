const { getMaticPlasmaClient, plasma, from } = require('../../utils')

const token = plasma.parent.erc721
async function execute() {
  const { matic } = await getMaticPlasmaClient()
  // get approved first
  await matic.tokenOfOwnerByIndexERC721(from, token, 2, { from, gasPrice: '10000000000' })
}

execute()
  .then(console.log)
  .then(_ => {
    process.exit(0)
  })
