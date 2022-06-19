---
Title: 'ExitUtil'
Keywords: 'exit util, api type, read, write, polygon'
Description: 'matic.js internally use ExitUtil for generating proof'
---

# ExitUtil

`matic.js` internally use `ExitUtil` for generating proof. It is a class which has different methods for helping with exit utilities.

## buildPayloadForExit

It exposes `buildPayloadForExit` method which can be used to generate proof.

```
import { ExitUtil, RootChain, use, Web3SideChainClient } from "@maticnetwork/maticjs";
import { Web3ClientPlugin } from "@maticnetwork/maticjs-web3";
import HDWalletProvider from "@truffle/hdwallet-provider";
import { from, privateKey, RPC } from "./config";
use(Web3ClientPlugin);


const client = new Web3SideChainClient<any>();
// initiate client
await client.init({
    // log: true,
    network: 'testnet',
    version: 'mumbai',
    parent: {
        provider: new HDWalletProvider(privateKey, RPC.parent),
        defaultConfig: {
            from
        }
    },
    child: {
        provider: new HDWalletProvider(privateKey, RPC.child),
        defaultConfig: {
            from
        }
    }
});

// create root chain instance
const rootChain = new RootChain(client, <root chain address>);

// create exitUtil Instance
const exitUtil = new ExitUtil(client, rootChain);

// generate proof
const proof = await exitUtil.buildPayloadForExit(
    <burn tx hash>,
    <log event signature>,
    <isFast>
)

```

### Generating proof using bridge client

Every bridge client including **POSClient**, **PlasmaClient** exposes `exitUtil` property.

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

const proof = await posClient.exitUtil.buildPayloadForExit(
    <burn tx hash>,
    <log event signature>,
    <isFast>
)
```

### Example to generate batch proofs and exit

Every bridge client including **POSClient**, **PlasmaClient** exposes `exitUtil` property.

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
const payloads = await posClient.exitUtil.buildMultiplePayloadsForExit(
    <burn tx hash>,
    <log event signature>
)
for(payload of paylaods) {
    const result = await posClient.rootChainManager.exit(payload)
}
```
