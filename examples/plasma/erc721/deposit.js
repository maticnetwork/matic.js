const { getMaticPlasmaClient, plasma, from } = require('../../utils')

const token = plasma.parent.erc721
const tokenId721 = '2'
async function execute() {
  const { matic } = await getMaticPlasmaClient()
  // get approved first
  await matic.safeDepositERC721Tokens(token, tokenId721, { from, gasPrice: '10000000000' })
}

execute()
  .then(console.log)
  .then(_ => {
    process.exit(0)
  })
