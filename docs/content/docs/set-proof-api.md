---
Title: 'setProofApi'
Keywords: 'setProofApi, polygon, sdk'
Description: 'Config proof api'
---

# setProofApi

You will see some of the APIs with **faster** suffix, which makes the process faster. It does so by using proof generation api which can be hosted by anyone.

Polygon has hosted the proof generation api which can be used by anyone. The API url is - [https://apis.matic.network/](https://apis.matic.network/)

The `setProofApi` can be used to set the proof api url.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");
```

👉 We recommend to host the proof API by yourself which will give you better performance. The default api provided by Polygon might have performance issue as it is being used by multiple people. 

Here is proof api repo link - [https://github.com/maticnetwork/proof-generation-api](https://github.com/maticnetwork/proof-generation-api)

After you have deployed the api, you can set the api url in matic.js by using `setProofApi`.

e.g - if you have deployed the proof api and the base url is - `https://abc.com/`, then you need to set base url in `setProofApi`

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://abc.com/");
```

<div class="highlight">
We recommend using faster API's, because some API's particularly where proof is being generated does a lot of RPC calls and it might be very slow with public RPC's.
</div>
