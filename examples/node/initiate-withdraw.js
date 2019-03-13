// const Matic = require('maticjs').default
const Matic = require('../../lib/index').default
const config = require('./config')

// const mtoken = '0xca3C863EE5a4aFD2FCcADC5427dDBd7C28B254b0' // test token address
const mtoken = config.MATIC_TOKEN // Matic child token address
const amount = '10000000000000000' // amount in wei (0.01 TEST)
const from = config.FROM_ADDRESS // from address

// Create object of Matic
const matic = new Matic({
 maticProvider: config.MATIC_PROVIDER,
 parentProvider: config.PARENT_PROVIDER,
 rootChainAddress: config.ROOTCHAIN_ADDRESS,
 syncerUrl: config.SYNCER_URL,
 watcherUrl: config.WATCHER_URL,
})

matic.wallet = config.PRIVATE_KEY // prefix with `0x`

// Initiate the withdraw on the Matic chain, and wait for ~5 minutes for 
// the checkpoint (refer https://whitepaper.matic.network/#checklayer for technical details) 
// before confirming the withdraw by executing `confirm-withdraw.js`.
// The txHash from the output needs to be copied to the `confirm-withdraw.js` file before executing
matic
 .startWithdraw(mtoken, amount, {
   from,
   onTransactionHash: () => {
    //  console.log("Withdraw Initiated")
    //  console.log(txHash)
   },
})