const Network = require('@maticnetwork/meta/network')
const Matic = require('@maticnetwork/maticjs').default

async function getMaticClient(_network, _version) {
  const network = new Network(_network, _version)
  const matic = new Matic({
    maticProvider: network.Matic.RPC,
    parentProvider: network.Main.RPC,
    rootChain: network.Main.Contracts.RootChain,
    registry: network.Main.Contracts.Registry,
    depositManager: network.Main.Contracts.DepositManagerProxy,
    withdrawManager: network.Main.Contracts.WithdrawManagerProxy,
  })
  await matic.initialize()
  // const wallet = matic.web3Client.getWallet()
  // const parent = matic.web3Client.getParentWeb3()
  console.log(matic)
  // return { matic, network, wallet, parent }
}

getMaticClient()
