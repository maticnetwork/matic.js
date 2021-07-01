---
sidebar_position: 11
---

### matic.getTransferSignature(toSell, toBuy)

Off-chain signature generation for [transferWithSig](https://github.com/maticnetwork/contracts/blob/a9b77252ece25adcd3f74443411821883bb970e6/contracts/child/BaseERC20.sol#L35) function call

- `toSell` object
  - `token`: address of token owned,
  - `amount`: amount/tokenId of the token to sell,
  - `expiry`: expiry (block number after which the signature should be invalid),
  - `orderId`: a random 32 byte hex string,
  - `spender`: the address approved to execute this transaction
- `toBuy` object
  - `token`: address of token to buy
  - `amount`: amount/tokenId of token to buy
- `options` see [more infomation here](#approveERC20TokensForDeposit)

  - `from`: owner of the token (toSell)

  ```javascript
  // sell order
  let toSell = {
    token: token2,
    amount: value2,
    expiry: expire,
    orderId: orderId,
    spender: spender,
  };

  // buy order
  let toBuy = {
    token: token1,
    amount: value1,
  };

  const sig = await matic.getTransferSignature(toSell, toBuy, {
    from: tokenOwner,
  });
  ```

---
