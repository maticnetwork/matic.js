const bn = require('bn.js')
const utils = require('./utils')

const privateKey1 = '0x..'
const privateKey2 = '0x..'

async function init() {
  const { matic, wallet } = await utils.getMaticClient('testnet', 'v3')

  const token1 = '0x..' // address of token to sell
  const value1 = '' // amount/token id of token 1 to sell
  matic.setWallet(privateKey1) // owner of token1 (order creator)

  const token2 = '0x.. ' // address of token to buy
  const value2 = '' // amount/token id of token 2 to sell

  matic.setWallet(privateKey2) // transaction executor; token owner approves this account to execute the transfer

  const tokenOwner = wallet[0].address
  const spender = wallet[1].address // tx executor

  const orderFiller = '0x..' // address of account to transfer tokens to

  const orderId = '' // order Id is supposed to be unique for each order; 32 byte Hex string
  const expire = 0 // block number to expire the tx at; 0 for no expiry

  // sell order
  let toSell = {
    token: token1,
    amount: value1,
    expiry: expire,
    orderId: orderId,
    spender: spender,
  }

  // buy order
  let toBuy = {
    token: token2,
    amount: value2,
  }
  const sig = await matic.getTransferSignature(toSell, toBuy, {
    from: tokenOwner,
  })

  console.log('signature', sig)

  // transfers `toSell.token` from `tokenOwner` to `orderFiller`
  const tx = await matic.transferWithSignature(
    sig, // signature with the intent to buy tokens
    toSell, // sell order
    toBuy, // buy order
    orderFiller, // order fulfiller
    {
      from: spender, // approved spender
    }
  )

  console.log('tx', tx)
}

init()
