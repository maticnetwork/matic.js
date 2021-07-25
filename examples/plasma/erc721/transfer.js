const { getMaticPlasmaClient, from, plasma, to } = require('../../utils')

const tokenId = '2' // amount in wei
const token = plasma.child.erc721
const recipient = to
async function execute() {
  const { matic } = await getMaticPlasmaClient()

  await matic
    .transferERC721Tokens(token, recipient, tokenId, {
      from,
      // parent: true, // For token transfer on Main network (false for Matic Network)
    })
    .then(result => {
      console.log('hash', result) // eslint-disable-line
    })
    .catch(console.log)
}

execute().then(_ => {
  process.exit(0)
})
