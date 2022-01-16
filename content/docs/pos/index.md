---
Title: 'POSClient'
Keywords: 'maticjs, pos client, contract, polygon, sdk'
Description: 'Get started with maticjs'
---

# POSClient

`maticjs` provides `POSClient` to interact with **POS** Bridge.

```
import { POSClient,use } from "@maticnetwork/maticjs"

const posClient = new POSClient();

await posClient.init({
    network: 'testnet',
    version: 'mumbai',
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

Once `POSClient` is initiated, you can interact with all available APIS.
