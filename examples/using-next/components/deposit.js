import { useState } from 'react'

import store from '../utils/store'

const amount = '1000000000000000000'

function Deposit() {
  const [approvedTxHash, setApprovedTxHash] = useState(null)
  const [depositTxHash, setDepositTxHash] = useState(null)

  const depositTokens = () => {
    // Approve token
    store.matic
      .approveERC20TokensForDeposit(store.token, amount, {
        from: store.from,
        onTransactionHash: approvedTxHash => {
          setApprovedTxHash(approvedTxHash)
        },
      })
      .then(() => {
        // Deposit tokens
        store.matic.depositERC20Tokens(store.token, store.from, amount, {
          from: store.from,
          onTransactionHash: depositTxHash => {
            setDepositTxHash(depositTxHash)
          },
        })
      })
  }

  return (
    <div className="col">
      <button onClick={depositTokens} type="button">
        Deposit
      </button>
      {approvedTxHash ? (
        <div>
          Approved transaction:{' '}
          <a
            href={`https://ropsten.etherscan.io/tx/${approvedTxHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {approvedTxHash}
          </a>
        </div>
      ) : null}
      {depositTxHash ? (<div>
        Deposit success transaction:{' '}
        <a
          href={`https://ropsten.etherscan.io/tx/${depositTxHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {depositTxHash}
        </a>
      </div>
      ) : null}
    </div>
  )
}

export default Deposit