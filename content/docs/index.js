module.exports = [
  {
    text: 'Get Started',
    url: 'get-started',
  },
  {
    text: 'Installation',
    url: 'installation',
  },
  {
    text: 'Setup',
    url: 'setup',
    // expand: true,
    children: [
      {
        text: 'Web3.js',
        url: 'web3js',
      },
      {
        text: 'Ethers',
        url: 'ethers',
      },
    ],
  },
  {
    text: 'API Architecture',
    url: 'api-architecture',
  },
  {
    text: 'POS',
    url: 'pos',
    children: [
      {
        text: 'ERC20',
        url: 'erc20',

        children: [
          {
            text: 'getBalance',
            url: 'get-balance',
          },
          {
            text: 'approve',
            url: 'approve',
          },
          {
            text: 'approveMax',
            url: 'approve-max',
          },
          {
            text: 'getAllowance',
            url: 'get-allowance',
          },
          {
            text: 'deposit',
            url: 'deposit',
          },
          {
            text: 'transfer',
            url: 'transfer',
          },
          {
            text: 'withdrawStart',
            url: 'withdraw-start',
          },
          {
            text: 'withdrawExit',
            url: 'withdraw-exit',
          },
          {
            text: 'withdrawExitFaster',
            url: 'withdraw-exit-faster',
          },
          {
            text: 'isWithdrawExited',
            url: 'is-withdraw-exited',
          },
        ],
      },
      {
        text: 'ERC721',
        url: 'erc721',
        children: [
          {
            text: 'getTokensCount',
            url: 'get-tokens-count',
          },
          {
            text: 'getTokenIdAtIndexForUser',
            url: 'get-token-id-at-index-for-user',
          },
          {
            text: 'getAllTokens',
            url: 'get-all-tokens',
          },
          {
            text: 'isApproved',
            url: 'is-approved',
          },
          {
            text: 'isApprovedAll',
            url: 'is-approved-all',
          },
          {
            text: 'approve',
            url: 'approve',
          },
          {
            text: 'approveAll',
            url: 'approve-all',
          },
          {
            text: 'deposit',
            url: 'deposit',
          },
          {
            text: 'depositMany',
            url: 'deposit-many',
          },
          {
            text: 'withdrawStart',
            url: 'withdraw-start',
          },
          {
            text: 'withdrawStartMany',
            url: 'withdraw-start-many',
          },
          {
            text: 'withdrawExit',
            url: 'withdraw-exit',
          },
          {
            text: 'withdrawExitMany',
            url: 'withdraw-exit-many',
          },
          {
            text: 'withdrawExitFaster',
            url: 'withdraw-exit-faster',
          },
          {
            text: 'withdrawExitFasterMany',
            url: 'withdraw-exit-faster-many',
          },
          {
            text: 'isWithdrawExited',
            url: 'is-withdraw-exited',
          },
          {
            text: 'isWithdrawExitedMany',
            url: 'is-withdraw-exited-many',
          },
          {
            text: 'transfer',
            url: 'transfer',
          },
          {
            text: 'withdrawStartWithMetaData',
            url: 'withdraw-start-with-meta-data',
          },
        ],
      },
      {
        text: 'ERC1155',
        url: 'erc1155',
        children: [
          {
            text: 'getBalance',
            url: 'get-balance',
          },
          {
            text: 'approveAll',
            url: 'approve-all',
          },
          {
            text: 'approveAllForMintable',
            url: 'approve-all-for-mintable',
          },
          {
            text: 'isApprovedAll',
            url: 'is-approved-all',
          },
          {
            text: 'deposit',
            url: 'deposit',
          },
          {
            text: 'depositMany',
            url: 'deposit-many',
          },
          {
            text: 'withdrawStart',
            url: 'withdraw-start',
          },
          {
            text: 'withdrawStartMany',
            url: 'withdraw-start-many',
          },
          {
            text: 'withdrawExit',
            url: 'withdraw-exit',
          },
          {
            text: 'withdrawExitFaster',
            url: 'withdraw-exit-faster',
          },
          {
            text: 'withdrawExitMany',
            url: 'withdraw-exit-many',
          },
          {
            text: 'withdrawExitFasterMany',
            url: 'withdraw-exit-faster-many',
          },
          {
            text: 'isWithdrawExited',
            url: 'is-withdraw-exited',
          },
          {
            text: 'isWithdrawExitedMany',
            url: 'is-withdraw-exited-many',
          },
          {
            text: 'transfer',
            url: 'transfer',
          },
        ]
      },
      {
        text: 'isCheckPointed',
        url: 'is-check-pointed',
      },
      {
        text: 'isDeposited',
        url: 'is-deposited',
      },
      {
        text: 'depositEther',
        url: 'deposit-ether',
      },
    ],
  },
  {
    text: 'Plasma',
    url: 'plasma',
    children: [
      {
        text: 'ERC20',
        url: 'erc20',

        children: [
          {
            text: 'getBalance',
            url: 'get-balance',
          },
          {
            text: 'approve',
            url: 'approve',
          },
          {
            text: 'approveMax',
            url: 'approve-max',
          },
          {
            text: 'getAllowance',
            url: 'get-allowance',
          },
          {
            text: 'deposit',
            url: 'deposit',
          },
          {
            text: 'transfer',
            url: 'transfer',
          },
          {
            text: 'withdrawStart',
            url: 'withdraw-start',
          },
          {
            text: 'withdrawConfirm',
            url: 'withdraw-confirm',
          },
          {
            text: 'withdrawConfirmFaster',
            url: 'withdraw-confirm-faster',
          },
          {
            text: 'withdrawExit',
            url: 'withdraw-exit',
          },
        ],
      },
      {
        text: 'ERC721',
        url: 'erc721',
        children: [
          {
            text: 'getTokensCount',
            url: 'get-tokens-count',
          },
          {
            text: 'getTokenIdAtIndexForUser',
            url: 'get-token-id-at-index-for-user',
          },
          {
            text: 'getAllTokens',
            url: 'get-all-tokens',
          },
          {
            text: 'safeDeposit',
            url: 'safe-deposit',
          },
          {
            text: 'withdrawStart',
            url: 'withdraw-start',
          },
          {
            text: 'withdrawConfirm',
            url: 'withdraw-confirm',
          },
          {
            text: 'withdrawConfirmFaster',
            url: 'withdraw-confirm-faster',
          },
          {
            text: 'withdrawExit',
            url: 'withdraw-exit',
          },
          {
            text: 'transfer',
            url: 'transfer',
          },
        ],
      },
      {
        text: 'isDeposited',
        url: 'is-deposited',
      },
      {
        text: 'isCheckPointed',
        url: 'is-check-pointed',
      },
      {
        text: 'withdrawExit',
        url: 'withdraw-exit',
      },
      {
        text: 'depositEther',
        url: 'deposit-ether',
      },
    ],
  },
  {
    text: 'FxPortal',
    url: 'fx-portal',
  },
  {
    text: 'setProofApi',
    url: 'set-proof-api',
  },
  {
    text: 'Advanced',
    url: 'advanced',
    expand: true,

    children: [
      {
        text: 'ABIManager',
        url: 'abi-manager',
      },
      {
        text: 'Plugin',
        url: 'plugin',
      },
      {
        text: 'ExitUtil',
        url: 'exit-util',
      },
    ],
  },
]
