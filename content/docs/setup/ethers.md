---
Title: 'Ethers setup'
Keywords: 'pos client, erc20, withdrawExit, polygon, sdk'
Description: 'Get started with maticjs'
---

# Ether.js

The [ethers.js](https://docs.ethers.io/) library aims to be a complete and compact library for interacting with the Ethereum Blockchain and its ecosystem.

## Setup ether.js

ether.js support is available via a separate package as a plugin for matic.js.

### Installation

```
npm install @maticnetwork/maticjs-ethers

```

### setup

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'

// install ethers plugin
use(Web3ClientPlugin)
```

Let's see one example of creating `POSClient` using ethers -

```
import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'
import { providers, Wallet } from "ethers";


// install web3 plugin
use(Web3ClientPlugin);

const parentProvider = new providers.JsonRpcProvider(rpc.parent);
const childProvider = new providers.JsonRpcProvider(rpc.child);

const posClient = new POSClient();
await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new Wallet(privateKey, parentProvider),
      defaultConfig: {
        from : fromAddress
      }
    },
    child: {
      provider: new Wallet(privateKey, childProvider),
      defaultConfig: {
        from : fromAddress
      }
    }
});

```

## Examples

The examples for different cases are available on [ethers plugin repo](https://github.com/maticnetwork/maticjs-ethers).
