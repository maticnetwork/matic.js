---
Title: 'Get started'
Keywords: 'maticjs, introduction, contract, polygon, sdk'
Description: 'Get started with maticjs'
---

# Get Started

The `@matic.js` is a javascript library which helps in interacting with the various components of Matic Network.

In this Get Started tutorial - we will learn about how we can setup and interact with the POS bridge.

## Installation

**Install the maticjs package via npm:**

```bash
npm install @maticnetwork/maticjs
```

**Install the web3js plugin**

```bash
npm install @maticnetwork/maticjs-web3
```

## Setup

```javascript
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

In the above code we are initiating maticjs with `web3js` but you can also similarly initiate with [ethers](docs/setup/ethers).

## POS client

`POSClient` helps us to interact with POS Bridge.

```
import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin);

const posClient = new POSClient();
await posClient.init({
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

```

After `POSClient` is initiated, we need to initiate the required token types like - `erc20`, `erc721` etc.

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

Once erc20 is initaited, you can call various methods that are available, like - `getBalance`, `approve`, `deposit` , `withdraw` etc.

Let's see some of the API examples -

#### get balance

```
const balance = await erc20ChildToken.getBalance(<userAddress>)
console.log('balance', balance)
```

#### approve

```
// approve amount 10 on parent token
const approveResult = await erc20ParentToken.approve(10);

// get transaction hash
const txHash = await approveResult.getTransactionHash();

// get transaction receipt
const txReceipt = await approveResult.getReceipt();
```

<div class="mt-20px mb-20px top-border"></div>

As you can see, with its simple APIs maticjs makes it very easy to interact with maticjs bridge. **Let's get started with creating something awesome**

### Some important links

- [Examples](https://github.com/maticnetwork/matic.js/tree/master/examples)
