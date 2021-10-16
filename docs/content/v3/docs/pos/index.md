---
Title: 'POSClient'
Keywords: 'maticjs, pos client, contract, polygon, sdk'
Description: 'Get started with maticjs'
---

# POSClient

`maticjs` provides `POSClient` to interact with **POS** Bridge.

```
import { POSClient,use } from "@maticnetwork/maticjs"

const posClient = new POSClient({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: <parent provider>
    },
    child: {
      provider: <child provider>
    }
});

await posClient.init();

```

Once `POSClient` is initiated, you can interact with all available APIS.
