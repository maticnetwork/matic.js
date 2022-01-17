---
Title: 'isWithdrawExited ERC20 POS '
Keywords: 'pos client, erc20, isWithdrawExited, polygon, sdk'
Description: 'isWithdrawExited method can be used to know whether the withdraw has been exited or not'
---

# isWithdrawExited

`isWithdrawExited` method can be used to know whether the withdraw has been exited or not.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

const isExited = await erc20Token.isWithdrawExited(<burn tx hash>);
```
