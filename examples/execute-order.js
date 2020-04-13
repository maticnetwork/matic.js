const utils = require('./utils')

// it is not recommended to hard-code private keys in the script, this is only for testing.
const privateKey1 = '0x..'
const privateKey2 = '0x..'

async function init() {
  const { matic, wallet } = await utils.getMaticClient('testnet', 'v3')

  const token1 = '0x683E640bb210355B877eae20ae083971eF3BFDbD' // address of token to sell. Provided is a sample erc20 token deployed on testnetv3, with a public `mint` function - for testing
  const value1 = '1' // amount/token id of token 1 to sell. Please make sure the account holds the specified value
  matic.setWallet(privateKey1) // owner of token1 (order creator)

  const token2 = '0x37fc65a422fdCc3BBC8Fa27f32035Bea9aCCA438' // address of token to buy. Provided is a sample erc721 token deployed on testnetv3, with a public `mint` function - for testing. Please make sure the token is not already minted before minting a new token
  const value2 = '12' // amount/token id of token 2 to sell.

  matic.setWallet(privateKey2) // transaction executor; token owner approves this account to execute the transfer

  const tokenOwner = wallet[0].address
  const spender = wallet[1].address // tx executor

  const orderFiller = '0x..' // address of account to transfer tokens to. Address corresponding to privateKey2

  const orderId = '' // order Id is supposed to be unique for each order; a random 32 byte Hex string
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
