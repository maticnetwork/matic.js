---
Title: 'PlasmaClient'
Keywords: 'maticjs, plasma client, contract, polygon, sdk'
Description: 'Get started with maticjs'
---

`maticjs` provides `plasmaClient` to interact with **POS** Bridge.

```
import { PlasmaClient } from "@maticnetwork/maticjs"

const plasmaClient = new PlasmaClient({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: <parent provider>
    },
    child: {
      provider: <child provider>
    }
});

await plasmaClient.init();

```

Once `plasmaClient` is initiated, you can interact with all available APIS.
