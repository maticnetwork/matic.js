---
Title: 'PlasmaClient'
Keywords: 'maticjs, plasma client, contract, polygon, sdk'
Description: 'PlasmaClient allows you to interact with POS Bridge.'
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
import { PlasmaClient } from "@maticnetwork/maticjs-plasma"

const plasmaClient = new PlasmaClient();

await plasmaClient.init({
    network: <network name>,  // 'testnet' or 'mainnet'
    version: <network version>, // 'mumbai' or 'v1'
    parent: {
      provider: <parent provider>,
      defaultConfig: {
            from: <from address>
      }
    },
    child: {
      provider: <child provider>,
      defaultConfig: {
            from: <from address>
      }
    }
});

```

Once `plasmaClient` is initiated, you can interact with all available APIS.
