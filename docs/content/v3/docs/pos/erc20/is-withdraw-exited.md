---
Title: 'isWithdrawExited ERC20 POS '
Keywords: 'pos client, erc20, withdrawExit, polygon, sdk'
Description: 'Get started with maticjs'
---

# isWithdrawExited

`isWithdrawExited` method can be used to know whether the withdraw has been exited or not.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// start withdraw process for 100 amount
const isExited = await erc20Token.isWithdrawExited(<burn tx hash>);
```
