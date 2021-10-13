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
      // {
      //   text: 'ERC721',
      //   url: 'erc721',
      // },
      {
        text: 'isCheckPointed',
        url: 'is-check-pointed',
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
            text: 'transfer',
            url: 'transfer',
          },
          {
            text: 'withdrawStart',
            url: 'withdraw-start',
          },
          {
            text: 'withdrawChallenge',
            url: 'withdraw-challenge',
          },
          {
            text: 'withdrawChallengeFaster',
            url: 'withdraw-challenge-faster',
          },
          {
            text: 'withdrawExit',
            url: 'withdraw-exit',
          },
        ],
      },
      // {
      //   text: 'ERC721',
      //   url: 'erc721',
      // },
    ],
  },
]
