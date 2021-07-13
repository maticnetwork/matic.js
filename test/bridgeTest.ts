/* global describe, it, beforeEach */

// import chai = require('chai')
// const Matic  = require('../dist/ts')

// import chai  from 'chai'
import Matic from '../src'
// import { MaticPOSClient } from '../src'').MaticPOSClient
import { MaticPOSClient } from '../src'
import 'mocha'
import configPlasma from '../config.json'
import assert from 'assert'
import configPos from '../config.json'
import HDWalletProvider from '@truffle/hdwallet-provider'
// set up chai
// chai.should()
// const expect = chai.expect
const from = configPlasma.FROM_ADDRESS // from address
const amount = '1000000000000000' // amount in wei
const tokenERC20 = configPlasma.GOERLI_ERC20 // ERC20 token address
const tokenERC721 = configPlasma.GOERLI_ERC721 // ERC721 token address
const tokenId721 = '2' // amount in wei
const recipient = '0x28e9E72DbF7ADee19B5279C23E40a1b0b35C2B90'
const rootTokenAddressERC20 = configPos.GOERLI_ERC20 // Root ERC20 token address

const getMaticPOSClient = () => {
  return new MaticPOSClient({
    network: 'testnet', // For mainnet change this to mainnet
    version: 'mumbai', // For mainnet change this to v1
    parentProvider: new HDWalletProvider(configPos.user.privateKey, configPos.root.RPC),
    maticProvider: new HDWalletProvider(configPos.user.privateKey, configPos.child.RPC),
    parentDefaultOptions: { from: configPos.user.address }, // optional, can also be sent as last param while sending tx
    maticDefaultOptions: { from: configPos.user.address }, // optional, can also be sent as last param while sending tx
  })
}

const maticPOSClient = getMaticPOSClient()

const matic = new Matic({
  maticProvider: configPlasma.MATIC_PROVIDER,
  parentProvider: configPlasma.PARENT_PROVIDER,
  rootChain: configPlasma.ROOTCHAIN_ADDRESS,
  withdrawManager: configPlasma.WITHDRAWMANAGER_ADDRESS,
  depositManager: configPlasma.DEPOSITMANAGER_ADDRESS,
  registry: configPlasma.REGISTRY,
})

describe('Matic SDK', () => {
  before(async () => {
    await matic.initialize()
    matic.setWallet(configPlasma.PRIVATE_KEY)
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

  it('pos: deposit: eth', async () => {
    let tx = await maticPOSClient.depositEtherForUser(from, amount, {
      from: configPos.user.address,
      gasPrice: '900000000000',
      gas: '250000',
    })
    // console.log(tx)
    assert.ok(tx)
  }).timeout(30000)

  it('pos: approve: ERC20', async () => {
    const tx = await maticPOSClient.approveERC20ForDeposit(configPos.root.DERC20, configPos.user.amount, {
      from: configPos.user.address,
      gasPrice: '900000000000',
      gas: '250000',
    })

    assert.ok(tx)
  }).timeout(40000)

  it('pos: deposit: ERC20', async () => {
    const tx = await maticPOSClient.depositERC20ForUser(
      configPos.root.DERC20,
      configPos.user.address,
      configPos.user.amount,
      {
        from: configPos.user.address,
        gasPrice: '900000000000',
        gas: '550000',
      }
    )
    // console.log(tx)
    assert.ok(tx)
  }).timeout(30000)

  it('pos: approve: ERC721', async () => {
    const tx = await maticPOSClient.approveERC721ForDeposit(configPos.root.DERC721, configPos.user.tokenId, {
      from: configPos.user.address,
      gasPrice: '900000000000',
      gas: '550000',
    })

    assert.ok(tx)
  }).timeout(30000)

  it('pos: deposit: ERC721', async () => {
    const tx = await maticPOSClient.depositERC721ForUser(
      configPos.root.DERC721,
      configPos.user.address,
      configPos.user.tokenId,
      {
        from: configPos.user.address,
        gasPrice: '900000000000',
        gas: '550000',
      }
    )

    assert.ok(tx)
  }).timeout(30000)

  it('pos: approve: ERC1155', async () => {
    const tx = await maticPOSClient.approveERC1155ForDeposit(configPos.root.DERC1155, {
      from: configPos.user.address,
      gasPrice: '900000000000',
      gas: '550000',
    })
    // console.log(tx)
    assert.ok(tx)
  }).timeout(30000)

  it('pos: deposit: ERC1155', async () => {
    const tx = await maticPOSClient.depositSingleERC1155ForUser(
      configPos.root.DERC1155,
      configPos.user.address,
      '123',
      '1',
      '',
      {
        from: configPos.user.address,
        gasPrice: '900000000000',
        gas: '550000',
      }
    )
    // console.log(tx)
    assert.ok(tx)
  }).timeout(90000)
})
