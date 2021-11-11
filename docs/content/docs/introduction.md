---
Title: 'Introduction'
Keywords: 'maticjs, introduction, contract, polygon, sdk'
Description: 'Introduction to maticjs'
---

The [`@matic.js`](https://github.com/maticnetwork/matic.js/) client library makes it easy for developers, who may not be deeply familiar with smart contract development, to interact with the various components of Matic Network.

## Quick Setup

Install the maticjs package via npm:

```bash
$ npm install --save @maticnetwork/maticjs
```

### Bridge

A bridge is basically a set of contracts that help in moving assets from the root chain to the child chain and vice versa.

There are primarily two bridges to move assets between Ethereum and Matic.

1. [POS](https://docs.matic.today/docs/develop/ethereum-matic/pos/getting-started/)
2. [Plasma](https://docs.matic.today/docs/develop/ethereum-matic/plasma/getting-started)

You can read more about Bridge [here](https://docs.matic.today/docs/develop/ethereum-matic/pos/getting-started/)

Matic.js provides you respective client to use these bridges

#### Plasma Bridge

```js
const MaticPlasmaClient = require('@maticnetwork/maticjs')
```

Now using `MaticPlasmaClient` we can do transaction on plasma bridge. The client contains different apis to help you with the transaction.
These API are covered in [Plasma API](/docs/plasma/initialize/).

#### POS Bridge

```js
const { MaticPoSClient } = require('@maticnetwork/maticjs')
```

Now using `MaticPoSClient` we can do transaction on POS bridge. The client contains different apis to help you with the transaction.
These API are covered in [POS API](/docs/pos/initialize/).

### Some important links

- [Examples](https://github.com/maticnetwork/matic.js/tree/master/examples)
