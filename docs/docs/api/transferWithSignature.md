---
sidebar_position: 12
---

### matic.transferWithSignature(sig, toSell, toBuy, orderFiller)

Executes [transferWithSig](https://github.com/maticnetwork/contracts/blob/a9b77252ece25adcd3f74443411821883bb970e6/contracts/child/BaseERC20.sol#L35) on child token (erc20/721). Takes input as signature generated from `matic.getTransferSignature`

- `sig`: signature generated with matic.getTransferSignature
- `toSell`: object
  - `token`: address of token owned,
  - `amount`: amount/tokenId of the token to sell,
  - `expiry`: expiry (block number after which the signature should be invalid),
  - `orderId`: a random 32 byte hex string,
  - `spender`: the address approved to execute this transaction
- `toBuy`: object
  - `token`: address of token to buy
  - `amount`: amount/tokenId of token to buy
- `orderFiller`: address of user to transfer the tokens to
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `from`: the approved spender in the `toSell` object by the token owner

transfers `toSell.token` from `tokenOwner` to `orderFiller`

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

let sig = await matic.getTransferSignature(toSell, toBuy, { from: tokenOwner });

const tx = await matic.transferWithSignature(
  sig, // signature with the intent to buy tokens
  toSell, // sell order
  toBuy, // buy order
  orderFiller, // order fulfiller
  {
    from: spender, // approved spender
  }
);
```

---
