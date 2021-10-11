---
Title: 'Web3js setup'
Keywords: 'pos client, erc20, withdrawExit, polygon, sdk'
Description: 'Get started with maticjs'
---

## Setup ethers

In order to use web3.js, you need to first install web3js plugin.

### Installation

```
npm install @maticnetwork/maticjs-ethers

```

### setup

```
import { use } from '@maticnetwork/maticjs'
import EthersPlugin from '@maticnetwork/maticjs-ethers'

// install ethers plugin
use(EthersPlugin)
```
