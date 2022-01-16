---
Title: 'depositMany erc11555 POS  '
Keywords: 'pos client, erc1155, deposit, polygon, sdk'
Description: 'Multiple deposit of erc1155 token using matic.js'
---

# depositMany

`depositMany` method can be used to deposit required amounts of multiple token from ethereum to polygon chain. 

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);
 
const result = await erc1155RootToken.depositMany({
    amount: [1,2],
    tokenId: ['123','456'],
    userAddress: <from address>,
    data: '0x5465737445524331313535', // data is optional
});

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Supplying **data** is optional.