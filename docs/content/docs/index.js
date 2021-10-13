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
        text: 'Initialize Plasma client',
        url: 'initialize',
      },
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
      {
        text: 'Deposit Ethers',
        url: 'depositEthers',
      },
      {
        text: 'Deposit Status From TxHash',
        url: 'depositStatusFromTxHash',
      },
      {
        text: 'Get Transfer Signature',
        url: 'getTransferSignature',
      },
      {
        text: 'Transfer with Signature',
        url: 'transferWithSignature',
      },
      {
        text: 'Process Exit',
        url: 'processExits',
      },
      {
        text: 'Withdraw Manager',
        url: 'WithdrawManager',
        expand: true,
        children: [
          {
            text: 'Exit Mintable Burnt Tokens',
            url: 'startExitForMintableBurntToken',
          },
          {
            text: 'Exit Metadata Mintable Burnt Tokens',
            url: 'startExitForMetadataMintableBurntToken',
          },
        ],
      },
    ],
  },
  {
    text: 'POS API',
    url: 'pos',
    expand: true,
    children: [
      {
        text: 'Initialize POS client',
        url: 'initialize',
      },
      {
        text: 'ERC20',
        url: 'ERC20',
        expand: true,

        children: [
          {
            text: 'Approve ERC20 Deposit',
            url: 'approveERC20ForDeposit',
          },
          {
            text: 'Deposit ERC20',
            url: 'depositERC20ForUser',
          },
          {
            text: 'Burn ERC20',
            url: 'burnERC20',
          },
          {
            text: 'Exit ERC20',
            url: 'exitERC20',
          },
        ],
      },
      {
        text: 'ERC721',
        url: 'ERC721',
        expand: true,

        children: [
          {
            text: 'Approve ERC721 Deposit',
            url: 'approveERC721ForDeposit',
          },
          {
            text: 'Deposit ERC721',
            url: 'depositERC721ForUser',
          },
          {
            text: 'Burn ERC721',
            url: 'burnERC721',
          },
          {
            text: 'Exit ERC721',
            url: 'exitERC721',
          },
        ],
      },
      {
        text: 'ERC1155',
        url: 'ERC1155',
        expand: true,
        children: [
          {
            text: 'Approve ERC1155 Deposit',
            url: 'approveERC1155ForDeposit',
          },
          {
            text: 'Deposit ERC1155',
            url: 'depositERC1155ForUser',
          },
          {
            text: 'Burn ERC1155',
            url: 'burnERC1155',
          },
          {
            text: 'Exit ERC1155',
            url: 'exitERC1155',
          },
          {
            text: 'Transfer ERC1155',
            url: 'transferERC1155',
          },
        ],
      },
      {
        text: 'Deposit Ethers',
        url: 'depositEtherForUser',
      },
    ],
  },
]
