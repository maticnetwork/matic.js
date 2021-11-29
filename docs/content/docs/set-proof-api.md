---
Title: 'setProofApi'
Keywords: 'setProofApi, polygon, sdk'
Description: 'Get started with maticjs'
---

# setProofApi

You will see some of the APIs with **faster** suffix, which makes a process faster. It does so by using the backend resources and faster rpc.

For making `faster apis` to work - you will have to host a [proof api](https://github.com/maticnetwork/proof-generation-api) at your expense.

After you have deployed the api, you can set the api url in matic.js by using `setProofApi`.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi(<api url>);
```

e.g - if you have deployed the proof api and the base url is - `https://abc.com/`, then you need to set base url in `setProofApi`

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("abc.com");
```

<div class="highlight">
We recommend using faster API's, because some API's particularly where proof is being generated does a lot of RPC calls and it might be very slow with public RPC's.
</div>
