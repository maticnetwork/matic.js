// import { MaticPOSClient } from '@maticnetwork/maticjs'
// import assert from 'assert'
// import HDWalletProvider from '@truffle/hdwallet-provider'

// const env = process.env
// const from = env.user1_address
// const amount = '1000000000000000' // amount in wei

// const getMaticPOSClient = () => {
//   return new MaticPOSClient({
//     network: 'testnet', // For mainnet change this to mainnet
//     version: 'mumbai', // For mainnet change this to v1
//     parentProvider: new HDWalletProvider(env.user1_privateKey, env.POS_RPC),
//     maticProvider: new HDWalletProvider(env.user1_privateKey, env.child_RPC),
//     parentDefaultOptions: { from: env.user1_address }, // optional, can also be sent as last param while sending tx
//     maticDefaultOptions: { from: env.user1_address }, // optional, can also be sent as last param while sending tx
//   })
// }

// const maticPOSClient = getMaticPOSClient()

// describe('POS Bridge', () => {
//   it('deposit: eth', async () => {
//     let tx = await maticPOSClient.depositEtherForUser(from, amount, {
//       from: from,
//       gasPrice: '900000000000',
//       gas: '250000',
//     })
//     // console.log(tx)
//     assert.ok(tx)
//   }).timeout(30000)

//   it('approve: ERC20', async () => {
//     const tx = await maticPOSClient.approveERC20ForDeposit(env.POS_DERC20, '100000000000000000', {
//       from: from,
//       gasPrice: '900000000000',
//       gas: '250000',
//     })

//     assert.ok(tx)
//   }).timeout(40000)

//   it('deposit: ERC20', async () => {
//     const tx = await maticPOSClient.depositERC20ForUser(env.POS_DERC20, from, '100000000000000000', {
//       from: from,
//       gasPrice: '900000000000',
//       gas: '550000',
//     })
//     // console.log(tx)
//     assert.ok(tx)
//   }).timeout(30000)

//   it('approve: ERC721', async () => {
//     const tx = await maticPOSClient.approveERC721ForDeposit(env.POS_DERC721, env.POS_ERC720TokenId, {
//       from: from,
//       gasPrice: '900000000000',
//       gas: '550000',
//     })

//     assert.ok(tx)
//   }).timeout(30000)

//   it('deposit: ERC721', async () => {
//     const tx = await maticPOSClient.depositERC721ForUser(env.POS_DERC721, from, env.POS_ERC720TokenId, {
//       from: from,
//       gasPrice: '900000000000',
//       gas: '550000',
//     })

//     assert.ok(tx)
//   }).timeout(30000)

//   it('approve: ERC1155', async () => {
//     const tx = await maticPOSClient.approveERC1155ForDeposit(env.DERC1155, {
//       from: from,
//       gasPrice: '900000000000',
//       gas: '550000',
//     })
//     // console.log(tx)
//     assert.ok(tx)
//   }).timeout(30000)

//   it('deposit: ERC1155', async () => {
//     const tx = await maticPOSClient.depositSingleERC1155ForUser(env.DERC1155, from, '123', '1', '', {
//       from: from,
//       gasPrice: '900000000000',
//       gas: '550000',
//     })
//     // console.log(tx)
//     assert.ok(tx)
//   }).timeout(90000)
// })
