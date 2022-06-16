---
Title: 'deposit ERC20 Plasma'
Keywords: 'plasma client, depositEther, polygon, sdk'
Description: 'Get started with maticjs'
---

# depositEther

`depositEther` method can be used to deposit required amount of **ether** from ethereum to polygon..

```
const result = await plasmaClient.depositEther(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
