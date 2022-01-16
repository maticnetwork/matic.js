<template><Layout title='setProofApi' description='Config proof api' keywords='setProofApi, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/set-proof-api.md'><h1 id="setproofapi">setProofApi</h1>
<p>You will see some of the APIs with <strong>faster</strong> suffix, which makes the process faster. It does so by using proof generation api in the backend which can be hosted by anyone.</p>
<p>Polygon has hosted the proof generation api which can be used by anyone. The API url is - <a href="https://apis.matic.network/">https://apis.matic.network/</a></p>
<p>The <code>setProofApi</code> can be used to set the proof api url.</p>
<pre><code>import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");
</code></pre>
<p>👉 We recommend to host the proof API by yourself which will give you better performance. The default api provided by Polygon might have performance issue as it is being used by multiple people. </p>
<p>Here is proof api repo link - <a href="https://github.com/maticnetwork/proof-generation-api">https://github.com/maticnetwork/proof-generation-api</a></p>
<p>After you have deployed the api, you can set the api url in matic.js by using <code>setProofApi</code>.</p>
<p>e.g - if you have deployed the proof api and the base url is - <code>https://abc.com/</code>, then you need to set base url in <code>setProofApi</code></p>
<pre><code>import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://abc.com/");
</code></pre>
<div class="highlight">
We recommend using faster API's, because some API's particularly where proof is being generated does a lot of RPC calls and it might be very slow with public RPC's.
</div></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        