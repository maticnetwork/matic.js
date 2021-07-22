const Matic = require('@maticnetwork/maticjs').default

const env = process.env
const from = env.user1_address

const matic = new Matic({
  maticProvider: env.MATIC_PROVIDER,
  parentProvider: env.PARENT_PROVIDER,
  rootChain: env.ROOTCHAIN_ADDRESS,
  withdrawManager: env.WITHDRAWMANAGER_ADDRESS,
  depositManager: env.DEPOSITMANAGER_ADDRESS,
  registry: env.REGISTRY,
})

const getBalance = async () => {
  await matic.initialize()
  matic.setWallet(env.user1_privateKey)
  const balance = await matic.balanceOfERC20(from, env.GOERLI_ERC20)
  console.log('balance', balance)
}

getBalance()
