---
sidebar_position: 3
---

### matic.balanceOfERC721(userAddress, token, options)

get balance of ERC721 `token` for `address`.

- `token` must be valid token address
- `userAddress` must be valid user address
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `parent` must be boolean value. For balance on Main chain, use `parent: true`

This returns `balance`.

Example:

```js
matic
  .balanceOfERC721("0xABc578455...", "0x5E9c4ccB05...", {
    from: "0xABc578455...",
  })
  .then((balance) => {
    console.log("balance", balance);
  });
```

---
