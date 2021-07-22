import Matic from '@maticnetwork/maticjs'
import assert from 'assert'
import { expect } from 'chai'

const env = process.env
const from = env.user1_address
const amount = '1000000000000000' // amount in wei
const goerliTokenERC20 = env.PLASMA_GOERLI_ERC20 // ERC20 token address
const mumbaiTokenERC20 = env.PLASMA_MUMBAI_ERC20 // ERC20 token address
const goerliTokenERC721 = env.PLASMA_GOERLI_ERC721 // ERC721 token address
const mumbaiTokenERC721 = env.PLASMA_MUMBAI_ERC721 // ERC721 token address
const tokenId721 = '2' // amount in wei
const recipient = env.user2_address
const rootTokenAddressERC20 = env.PLASMA_GOERLI_ERC20 // Root ERC20 token address

const matic = new Matic({
  maticProvider: env.MATIC_PROVIDER,
  parentProvider: env.PARENT_PROVIDER,
  rootChain: env.PLASMA_ROOTCHAIN_ADDRESS,
  withdrawManager: env.PLASMA_WITHDRAWMANAGER_ADDRESS,
  depositManager: env.PLASMA_DEPOSITMANAGER_ADDRESS,
  registry: env.PLASMA_REGISTRY,
})

describe('Plasma Bridge', () => {
  before(async () => {
    await matic.initialize()
    matic.setWallet(env.user1_privateKey)
    assert.ok(matic)
  })

  it('balanceOfERC20', async () => {
    const balance = await matic.balanceOfERC20(from, mumbaiTokenERC20)
    console.log('balance', balance)
    expect(balance).not.equal(null)
  })

  it('deposit ether', async () => {
    let response = await matic.depositEther(amount, {
      from,
      gasPrice: '200000000000',
    })
    // console.log(response)
    assert.ok(response)
  }).timeout(30000)

  it('approve ERC20', async () => {
    let response = await matic.approveERC20TokensForDeposit(goerliTokenERC20, amount, {
      from,
      gasPrice: '200000000000',
      gas: 2500000,
    })
    // console.log('approveERC20')
    assert.ok(response)
  })

  it('deposit ERC20', async () => {
    let response = await matic.depositERC20ForUser(goerliTokenERC20, from, amount, {
      from,
      gasPrice: '200000000000',
      gas: 2500000,
    })
    assert.ok(response)
  }).timeout(20000)

  it('balanceOfERC721', async () => {
    const balance = await matic.balanceOfERC721(from, mumbaiTokenERC721)
    console.log('balance', balance)
    expect(balance).not.equal(null)
  })

  it('deposit ERC721 successfully', async () => {
    let response = await matic.safeDepositERC721Tokens(goerliTokenERC721, tokenId721 as any, {
      from,
      gasPrice: '10000000000',
    })
    assert.ok(response)
  }).timeout(20000)

  it('transfer ERC20 successfully', async () => {
    let response = await matic.transferERC20Tokens(goerliTokenERC20, recipient, amount, {
      from,
      gas: 100000,
      // parent: true
    })

    assert.ok(response)
  }).timeout(30000)

  it('withdraw: initate burn ERC20', async () => {
    let response = await matic.startWithdraw(goerliTokenERC20, amount, {
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

  it('exit ERC20', async () => {
    let response = await matic.processExits(rootTokenAddressERC20, {
      from,
      gas: 100000,
    })
    assert.ok(response)
  })
})
