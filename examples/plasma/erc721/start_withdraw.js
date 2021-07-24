const { getMaticPlasmaClient, plasma, from } = require('../../utils')

const token = plasma.child.erc721
const tokenId721 = 1963
async function execute() {
  const { matic } = await getMaticPlasmaClient()
  // get approved first
  await matic.startWithdrawForNFT(token, tokenId721, { from })
}

execute()
  .then(console.log)
  .catch(console.log)
  .finally(_ => {
    process.exit(0)
  })
