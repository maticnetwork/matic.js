//
// This function is only supported till Matic.js v3.3.0
//

const { pos } = require('../../config')
const { getPOSClient, from } = require('../../utils_pos');

const execute = async () => {
  const client = await getPOSClient()
  const erc721Token = client.erc721(pos.parent.erc721, true)
  const result = await erc721Token.withdrawExitMany(
    '0x54f47c891b460369661e22e27eeb4afbbb5dd792c7c8b48cab758892c14ffe85'
  )

  for (tx of result) {
    const txHash = await tx.getTransactionHash()
    console.log('txHash', txHash)
    const receipt = await tx.getReceipt()
    console.log('receipt', receipt)
  }
}
execute()
  .then(() => {})
  .catch(err => {
    console.error('err', err)
  })
  .finally(_ => {
    process.exit(0)
  })
