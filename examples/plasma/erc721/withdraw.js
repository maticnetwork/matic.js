const { getMaticPlasmaClient, from } = require('../../utils')

var transactionHash = '0xbbaf7712bc426b665650992215f9c15ac9bda72bbb4e7d453ba9ed3875e0ebf5' // Insert txHash generated from initiate-withdraw.js

async function execute() {
  const { matic } = await getMaticPlasmaClient()

  await matic
    .withdrawNFT(transactionHash, {
      from,
    })
    .then(result => {
      console.log(result)
    })
}

execute().then(_ => {
  process.exit(0)
})
