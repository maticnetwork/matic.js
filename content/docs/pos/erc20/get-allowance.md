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

## spenderAddress

The address on which approval is given is called `spenderAddress`. It is a third-party user or a smart contract which can transfer your token on your behalf.

By default spenderAddress value is erc20 predicate address.

You can specify spender address value manually.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>, {
    spenderAddress: <spender address value>
});
```