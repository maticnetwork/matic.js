---
Title: 'Web3js setup'
Keywords: 'pos client, erc20, withdrawExit, polygon, sdk'
Description: 'Get started with maticjs'
---

## Setup ethers

In order to use ethers, you need to first install ethers plugin.

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
