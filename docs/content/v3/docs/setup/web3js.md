---
Title: 'Web3js setup'
Keywords: 'pos client, erc20, withdrawExit, polygon, sdk'
Description: 'Get started with maticjs'
---

## Setup web3.js

In order to use web3.js, you need to first install web3js plugin.

### Installation

```
npm install @maticnetwork/maticjs-web3js

```

### setup

```
import { use } from '@maticnetwork/maticjs'
import Web3Plugin from '@maticnetwork/maticjs-web3js'

// install web3 plugin
use(Web3Plugin)
```
