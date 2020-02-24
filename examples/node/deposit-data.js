const config = require('./config')
const utils = require('./utils')

// Create Matic object
const matic = utils.getMaticClient()

async function execute() {
  await matic.initialize()
  return matic.depositStatusFromTxHash('0x8cff1ef2b198273fe7f9fb41918cd7e3e8d04c58650614af39b3086e1de1a7e6')
}

execute().then(console.log) // eslint-disable-line
