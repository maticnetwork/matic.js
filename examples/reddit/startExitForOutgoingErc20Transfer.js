const utils = require('../utils')

async function execute() {
  const { matic } = await utils.getMaticClient()
  const { from } = utils.getAccount()

  // reddit token contract
  const childTokenAddress = '0xc4f93fef8086c452134b0f15a5ae963ace6a7748'
  const amount = '1' //matic.web3Client.web3.utils.toWei('1')
  const to = '0xc5c7F88090512DAfE9FE79881799BBCC9fB41EAd'

  // A. Reference
  let reference = await matic.transferERC20Tokens(childTokenAddress, to, amount, { from, parent: false, gas: 1000000 })
  const { transactionHash } = reference
  console.log(reference)

  // wait for the above to get checkpointed and put the tx hash here
  const transactionHash = '0xc127d4790733ddf2353f716e98dc200a472162f3c70628bce8699f9be6395f6f'

  // B. Inflight Tx
  let inFlight = await matic.transferERC20Tokens(childTokenAddress, to, amount, { from, parent: false })
  const inFlightTxHash = inFlight.transactionHash
  console.log(inFlight)

  // Put the inFlightTxHash here
  const inFlightTxHash = '0x4d18357e0d8351e34b3f90dcbe59a8320a229e8d37bbb3a37c418f07f4ee65ff'

  // C. Start withdraw
  const withdraw = await matic.withdrawManager.startExitForOutgoingErc20Transfer(transactionHash, inFlightTxHash, {
    from,
    gas: '7000000',
    value: matic.web3Client.web3.utils.toWei('.1'),
  })
  console.log(withdraw)
}

execute().then(_ => process.exit(0))
