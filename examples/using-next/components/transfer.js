import { useState } from 'react'

import store from '../utils/store'

const recepient = '0x7ed7f36694153ba6eff6ca6726b60f6e2bb17fcf' // test recepient address
const amount = '1000000000000000000'

function Transfer() {
  const [hash, setHash] = useState(null)

  const transferTokens = () => {
    // Send Tokens
    store.matic.transferTokens(store.token, recepient, amount, {
      from: store.from,
      onTransactionHash: hash => {
        // action on Transaction success
        // eslint-disable-next-line
        setHash(hash)
      },
    })
  }

  return (
    <div className="col">
      <button onClick={transferTokens} type="button">
        Transfer
      </button>
      {hash ? (
        <div>
          Your latest transaction:{' '}
          <a
            href={`https://explorer.testnet2.matic.network/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {hash}
          </a>
        </div>
      ) : null}
    </div>
  )
}

export default Transfer