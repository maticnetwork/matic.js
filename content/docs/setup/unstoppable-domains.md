---
Title: 'Unstoppable Domains setup'
Keywords: 'pos client, erc20, withdrawExit, polygon, sdk'
Description: 'Get started with maticjs'
---

# Unstoppable Domains

The [unstoppable domains](https://github.com/unstoppabledomains/resolution) library aims to be a complete and compact library for interacting with NFT domain names. You can use them to retrieve [payment addresses](https://docs.unstoppabledomains.com/crypto-payments/), IPFS hashes for [decentralized websites](https://docs.unstoppabledomains.com/d-websites/), DNS records, and other [records types](https://docs.unstoppabledomains.com/getting-started/domain-registry-essentials/records-reference/).

## Setup Unstoppable Domains

Unstoppable Domains support is available via a separate package as a plugin for matic.js.

### Installation

```
npm install @unstoppabledomains/maticjs-resolution
```

### setup

```
import { use } from '@maticnetwork/maticjs'
import { UnstoppableDomainsClientPlugin } from '@unstoppabledomains/maticjs-resolution'

// install unstoppable domains plugin
use(UnstoppableDomainsClientPlugin)
```

Let's see one example of resolving wallet address, domain records, and IPFS hash using unstoppable domains -

```
import HDWalletProvider from "@truffle/hdwallet-provider"
import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import { UnstoppableDomainsClientPlugin } from '@unstoppabledomains/maticjs-resolution'

// install unstoppable domains plugin
use(Web3ClientPlugin);
use(UnstoppableDomainsClientPlugin);

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
const client = posClient.client;

// Resolve a token address from a domain
const addr = await client.resolution.addr('brad.crypto', 'ETH');
console.log(`Ethereum address for brad.crypto is ${addr}`);

// Resolve all records from a domain
const records = await client.resolution.allRecords('brad.crypto');
console.log(`All records for brad.crypto are ${JSON.stringify(records)}`);

// Resolve an ipfs hash from a domain
const ipfsHash = await client.resolution.ipfsHash('homecakes.crypto');
console.log(`IPFS hash for homecakes.crypto is ${ipfsHash}`);
```

## Examples

The examples for different cases are available on [unstoppable domains plugin repo](https://github.com/unstoppabledomains/maticjs-resolution).
