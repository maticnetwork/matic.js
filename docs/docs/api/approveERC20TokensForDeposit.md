---
sidebar_position: 6
---

### matic.approveERC20TokensForDeposit(token, amount, options)

Approves given `amount` of `token` to `rootChainContract`.

- `token` must be valid ERC20 token address
- `amount` must be token amount in wei (string, not in Number)
- `options` (optional) must be valid javascript object containing `from`, `gasPrice`, `gasLimit`, `nonce`, `value`, `onTransactionHash`, `onReceipt` or `onError`
  - `from` must be valid account address(required)
  - `gasPrice` same as Ethereum `sendTransaction`
  - `gasLimit` same as Ethereum `sendTransaction`
  - `nonce` same as Ethereum `sendTransaction`
  - `value` contains ETH value. Same as Ethereum `sendTransaction`.
    This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
matic.approveERC20TokensForDeposit("0x718Ca123...", "1000000000000000000", {
  from: "0xABc578455...",
});
```

---
