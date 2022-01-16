<template><Layout title='POSClient' description='Get started with maticjs' keywords='maticjs, pos client, contract, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/pos/index.md'><h1 id="posclient">POSClient</h1>
<p><code>maticjs</code> provides <code>POSClient</code> to interact with <strong>POS</strong> Bridge.</p>
<pre><code>import { POSClient,use } from "@maticnetwork/maticjs"

const posClient = new POSClient();

await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: &lt;parent provider&gt;,
      defaultConfig: {
            from: &lt;from address&gt;
      }
    },
    child: {
      provider: &lt;child provider&gt;,
      defaultConfig: {
            from: &lt;from address&gt;
      }
    }
});
</code></pre>
<p>Once <code>POSClient</code> is initiated, you can interact with all available APIS.</p></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        