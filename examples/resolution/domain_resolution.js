const { pos } = require('../config')
const { getPOSClient, from } = require('../utils')

const execute = async () => {
  const { client } = await getPOSClient()

  const addr = client.resolution.addr('brad.crypto', 'ETH')
 
  console.log('resolved address by domain', await addr)
}

execute()
  .then(() => {})
  .catch(err => {
    console.error('err', err)
  })
  .finally(_ => {
    process.exit(0)
  })
