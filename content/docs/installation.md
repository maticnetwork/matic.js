---
Title: 'installation'
Keywords: 'pos client, erc20, withdrawExit, polygon, sdk'
Description: 'Get started with maticjs'
---

# Installation

maticjs has two parts -

1. Main library
2. Ethereum library

### Main library

The Main library has the core logic and provides different APIs. The user interacts mostly with this library.

```
npm i @maticnetwork/maticjs
```

### Ethereum library

Ethereum library allows us to use any favourite ether library. It is injected into maticjs using plugins.

matic.js supports two popular library -

1. [Web3.js](https://web3js.readthedocs.io/)
2. [Ethers](https://docs.ethers.io/)

#### Web3.js

```
npm install @maticnetwork/maticjs-web3
```

#### ethers

```
npm install @maticnetwork/maticjs-ethers
```
