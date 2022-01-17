---
Title: 'getAllowance ERC20 POS  '
Keywords: 'pos client, erc20, getAllowance, polygon, sdk'
Description: 'getAllowance method can be used to get the approved amount for the user.'
---

# getAllowance

`getAllowance` method can be used to get the approved amount for the user.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```
