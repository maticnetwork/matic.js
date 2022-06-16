---
Title: 'getAllowance ERC20 Plasma'
Keywords: 'plasma client, erc20, getAllowance, polygon, sdk'
Description: 'Get started with maticjs'
---

# getAllowance

`getAllowance` method can be used to get the approved amount for user.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```
