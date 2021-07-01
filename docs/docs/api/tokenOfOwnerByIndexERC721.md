---
sidebar_position: 4
---

### matic.tokenOfOwnerByIndexERC721(userAddress, token, index, options)

get ERC721 tokenId at `index` for `token` and for `address`.

- `token` must be valid token address
- `userAddress` must be valid user address
- `index` index of tokenId

This returns matic `tokenId`.

Example:

```js
matic
  .tokenOfOwnerByIndexERC721("0xfeb14b...", "21", 0, {
    from: "0xABc578455...",
  })
  .then((tokenID) => {
    console.log("Token ID", tokenID);
  });
```

---
