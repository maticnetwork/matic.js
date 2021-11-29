---
Title: 'PlasmaClient'
Keywords: 'maticjs, plasma client, contract, polygon, sdk'
Description: 'Get started with maticjs'
---

# Plasma Bridge

Plasma bridge functionality is available in [seperate repository](https://github.com/maticnetwork/maticjs-plasma). So in order to use `plasma` bridge, you need to install seperate package.

## Installation

```
npm i @maticnetwork/maticjs-plasma
```

## Setup

`PlasmaClient` can be used to interact with **Plasma** Bridge.

```
import { PlasmaClient } from "@maticnetwork/maticjs-web3"

const plasmaClient = new PlasmaClient();

await plasmaClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: <parent provider>
    },
    child: {
      provider: <child provider>
    }
});

```

Once `plasmaClient` is initiated, you can interact with all available APIS.
