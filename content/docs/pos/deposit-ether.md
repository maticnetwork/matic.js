---
Title: 'deposit ether POS'
Keywords: 'pos client, depositEther, polygon, sdk'
Description: 'Get started with maticjs'
---

# depositEther

`depositEther` method can be used to deposit required amount of **ether** from ethereum to polygon.

```
const result = await posClient.depositEther(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
