const utils = require('./utils')

// it is not recommended to hard-code private keys in the script, this is only for testing.
// prefix private keys with '0x'
const privateKey1 = '0x...' // owner of token1 (order creator)
const privateKey2 = '0x...' // transaction executor; token owner approves this account to execute the transfer

async function init() {
  const { matic, wallet, parent } = await utils.getMaticClient('testnet', 'v3')

  const token1 = '0x5696F5617ff401B8B1936EcFB57dA89CE0f054fF' // address of token to sell. Provided is a sample erc20 token deployed on testnetv3, with a public `mint` function - for testing
  const value1 = 1 // amount/token id of token 1 to sell. Please make sure the account holds the specified value
  matic.setWallet(privateKey1) // owner of token1 (order creator)

  const token2 = '0x63D052Dd8368F360dD5fFAeE08e5294CF4f33bCE' // address of token to buy. Provided is a sample erc721 token deployed on testnetv3, with a public `mint` function - for testing. Please make sure the token is not already minted before minting a new token
  const value2 = 2 // amount/token id of token 2 to sell.

  matic.setWallet(privateKey2) // transaction executor; token owner approves this account to execute the transfer

  const tokenOwner = wallet[1].address
  const spender = wallet[0].address // tx executor

  const orderFiller = wallet[0].address // address of account to transfer tokens to.
  const orderId = parent.utils.randomHex(32) // order Id is supposed to be unique for each order; a random 32 byte Hex string
  // console.log(orderId)

  const expire = 0 // block number to expire the tx at; 0 for no expiry

  // sell order
  let toSell = {
    token: token2,
    amount: value2,
    expiry: expire,
    orderId: orderId,
    spender: spender,
  }

  // buy order
  let toBuy = {
    token: token1,
    amount: value1,
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

  console.log('tx', tx.transactionHash)
}

init()
