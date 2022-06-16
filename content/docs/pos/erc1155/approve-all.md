---
Title: 'approve erc1155 POS  '
Keywords: 'pos client, erc1155, approve, polygon, sdk'
Description: 'Approve erc1155 token'
---

# approveAll

`approveAll` method can be used to approve all tokens on root token.

```
const erc1155RootToken = posClient.erc1155(<root token address>,true);

const approveResult = await erc1155RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
