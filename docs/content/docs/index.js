module.exports = [
  {
    text: 'Introduction',
    url: 'introduction',
  },
  {
    text: 'Basics',
    url: 'basics',
    expand: true,
    children: [
      {
        text: 'Installation',
        url: 'installation',
      },
      {
        text: 'How it works',
        url: 'how-it-works',
      },
    ],
  },
  {
    text: 'Plasma',
    url: 'plasma',
    expand: true,
    children: [
      {
        text: 'ERC20',
        url: 'erc20',
        expand: true,
        children: [
          {
            text: 'Balance of erc20',
            url: 'balanceOfERC20',
          },
          {
            text: 'Approve ERC20',
            url: 'approveERC20TokensForDeposit',
          },
          {
            text: 'Deposit ERC20',
            url: 'depositERC20ForUser',
          },
          {
            text: 'Transfer ERC20',
            url: 'transferERC20Tokens',
          },
          {
            text: 'Start Withdraw',
            url: 'startWithdraw',
          },
          {
            text: 'Withdraw ERC20',
            url: 'withdraw',
          },
        ],
      },
      {
        text: 'ERC721',
        url: 'erc721',
        expand: true,
        children: [
          {
            text: 'Balance Of ERC721',
            url: 'balanceOfERC721',
          },
          {
            text: 'Safe Deposit ERC721',
            url: 'safeDepositERC721Tokens',
          },
          {
            text: 'Token Of Owner By Index ERC721',
            url: 'tokenOfOwnerByIndexERC721',
          },
          {
            text: 'Start Withdraw For NFT',
            url: 'startWithdrawForNFT',
          },
          {
            text: 'Withdraw ERC721',
            url: 'withdrawNFT',
          },
          {
            text: 'Transfer ERC721',
            url: 'transferERC721Tokens',
          },
        ],
      },
    ],
  },
]
