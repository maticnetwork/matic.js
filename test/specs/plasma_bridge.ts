import Matic from '@maticnetwork/maticjs'
import assert from 'assert'

const env = process.env
const from = env.user1_address
const amount = '1000000000000000' // amount in wei
const tokenERC20 = env.GOERLI_ERC20 // ERC20 token address
const tokenERC721 = env.GOERLI_ERC721 // ERC721 token address
const tokenId721 = '2' // amount in wei
const recipient = env.user2_address
const rootTokenAddressERC20 = env.GOERLI_ERC20 // Root ERC20 token address

const matic = new Matic({
  maticProvider: env.MATIC_PROVIDER,
  parentProvider: env.PARENT_PROVIDER,
  rootChain: env.ROOTCHAIN_ADDRESS,
  withdrawManager: env.WITHDRAWMANAGER_ADDRESS,
  depositManager: env.DEPOSITMANAGER_ADDRESS,
  registry: env.REGISTRY,
})

describe('Plasma Bridge', () => {
  before(async () => {
    await matic.initialize()
    matic.setWallet(env.user1_privateKey)
    assert.ok(matic)
  })

  it('plasma: deposit ether', async () => {
    let response = await matic.depositEther(amount, {
      from,
      gasPrice: '200000000000',
    })
    // console.log(response)
    assert.ok(response)
  }).timeout(30000)

  it('plasma : approve ERC20', async () => {
    let response = await matic.approveERC20TokensForDeposit(tokenERC20, amount, {
      from,
      gasPrice: '200000000000',
      gas: 2500000,
    })
    // console.log('approveERC20')
    assert.ok(response)
  })

  it('plasma: deposit ERC20', async () => {
    let response = await matic.depositERC20ForUser(tokenERC20, from, amount, {
      from,
      gasPrice: '200000000000',
      gas: 2500000,
    })
    assert.ok(response)
  }).timeout(20000)

  it('plasma: deposit ERC721 successfully', async () => {
    let response = await matic.safeDepositERC721Tokens(tokenERC721, tokenId721 as any, {
      from,
      gasPrice: '10000000000',
    })
    assert.ok(response)
  }).timeout(20000)

  it('plasma: transfer ERC20 successfully', async () => {
    let response = await matic.transferERC20Tokens(tokenERC20, recipient, amount, {
      from,
      gas: 100000,
      // parent: true
    })

    assert.ok(response)
  }).timeout(30000)

  it('plasma: withdraw: initate burn ERC20', async () => {
    let response = await matic.startWithdraw(tokenERC20, amount, {
      from,
      gas: 100000,
    })
    assert.ok(response)
  }).timeout(30000)

  it('withdraw: confirm burn ERC20', async () => {
    let response = await matic.withdraw('0x3e542388aa4d4e1f6bc2296a833aee62310c03617900af311843adbae37618d6', {
      from,
      gas: 100000,
    })
    assert.ok(response)
  }).timeout(30000)

  it('plasma: exit: ERC20', async () => {
    let response = await matic.processExits(rootTokenAddressERC20, {
      from,
      gas: 100000,
    })
    assert.ok(response)
  })
})
