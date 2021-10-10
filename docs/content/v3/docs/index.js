module.exports = [
  {
    text: 'Get Started',
    url: 'get-started',
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
        ],
      },
    ],
  },
]
