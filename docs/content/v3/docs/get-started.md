---
Title: 'Get started'
Keywords: 'maticjs, introduction, contract, polygon, sdk'
Description: 'Get started with maticjs'
---

The `@matic.js` is a javascript library which helps to interact with the various components of Matic Network.

In this get started tutorial - we will learn about how we can setup and interact with POS bridge.

## Installation

**Install the maticjs package via npm:**

```bash
npm install @maticnetwork/maticjs
```

**Install the web3js plugin**

```bash
npm install @maticnetwork/maticjs-web3js
```

## Setup

```javascript
import { use } from '@maticnetwork/maticjs'
import Web3Plugin from '@maticnetwork/maticjs-web3js'

// install web3 plugin
use(Web3Plugin)
```

In the above code we are intiating maticjs with `web3js` but you can similarly initiate with `ethers`.

## POS client

`POSClient` help us to interact with POS Bridge.

```
import { POSClient,use } from "@maticnetwork/maticjs"
import Web3Plugin from "@maticnetwork/maticjs-web3js"
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3Plugin);

const posClient = new POSClient({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new HDWalletProvider(privateKey, mainRPC),
      defaultConfig: {
        from : fromAddress
      }
    },
    child: {
      provider: new HDWalletProvider(privateKey, childRPC),
      defaultConfig: {
        from : fromAddress
      }
    }
});
await posClient.init();

```

After `POSClient` is initiated, we need to initiate required token type like - `erc20`, `erc721` etc.

Let's initiate `erc20` -

### erc20

**create erc20 child token**

```
const erc20ChildToken = posClient.erc20(<token address>);
```

**create erc20 parent token**

```
const erc20ParentToken = posClient.erc20(<token address>, true);

```

Once erc20 is initaited, you can call various methods available like - `getBalance`, `approve`, `deposit` , `withdraw` etc.

Let's see some of the api example -

#### get balance

```
const balance = await erc20ChildToken.getBalance(<userAddress>)
console.log('balance', balance)
```

#### approve

```
// approve amount 10 on parent token
const approveResult = await erc20ParentToken.approve(10);
const txHash = approveResult.getTransactionHash();
const txReceipt = approveResult.getReceipt();
```

<div class="mt-20px mb-20px top-border"></div>

As you can see maticjs makes very easy to interact with maticjs bridge with its simple APIS. **Let's create something awesome.**

### Some important links

- [Examples](https://github.com/maticnetwork/matic.js/tree/master/examples)
