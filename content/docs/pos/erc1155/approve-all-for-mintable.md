---
Title: 'approve erc115 POS  '
Keywords: 'pos client, erc115, approve, polygon, sdk'
Description: 'Approve erc115 token'
---

# approveAllForMintable

`approveAllForMintable` method can be used to approve all mintable tokens on root token.

```
const erc115RootToken = posClient.erc115(<root token address>,true);

const approveResult = await erc115RootToken.approveAllForMintable();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
