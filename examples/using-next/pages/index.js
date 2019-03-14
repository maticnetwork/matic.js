// Import Matic sdk
import { useState } from 'react'
import Matic from 'maticjs'

let matic = null

// Create sdk instance
function initMatic() {
  if (!matic) {
    matic = new Matic({
      maticProvider: process.env.MATIC_PROVIDER,
      parentProvider: process.env.PARENT_PROVIDER,
      rootChainAddress: process.env.ROOTCHAIN_ADDRESS,
      maticWethAddress: process.env.MATIC_WETH_ADDRESS,
      syncerUrl: process.env.SYNCER_URL,
      watcherUrl: process.env.WATCHER_URL,
    })

    matic.wallet = '<private-key>' // your private key
  }
}

const from = '0x5784d63560319839e5696a283096e169d1F4E659' // from address
const recipient = '0x7ed7f36694153ba6eff6ca6726b60f6e2bb17fcf' // test recipient address
const token = '0xC4375B7De8af5a38a93548eb8453a498222C4fF2' // test token address
const amount = '10000000000000000'

function Home() {
  const [hash, setHash] = useState(null)

  const transferTokens = () => {
    // Send Tokens
    matic.transferTokens(token, recipient, amount, {
      from,
      onTransactionHash: (resp) => {
        // action on Transaction success
        // eslint-disable-next-line
        console.log('Transaction hash:', resp)
        setHash(resp)
      },
    })
  }

  initMatic()

  return (
    <div className="parent">
      <div>Welcome to Matic.js!</div>
      <button onClick={transferTokens} type="button">
        Transfer
      </button>
      {hash ?
        (
          <div>
            Your latest transaction:{' '}
            <a
              href={`https://testnet1-explorer.matic.network/#/transaction/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {hash}
            </a>
          </div>
        ) : null
      }
      <style jsx>{`
      .parent {
        font: 15px Helvetica, Arial, sans-serif;
        background: papayawhip;
        padding: 100px;
        text-align: center;
        transition: 100ms ease-in background;
      }
    `}</style>
    </div>
  )
}

export default Home
