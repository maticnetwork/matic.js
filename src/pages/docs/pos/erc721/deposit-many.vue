<template><Layout title='depositMany erc721 POS  ' description='Get started with maticjs' keywords='pos client, erc721, depositMany, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/pos/erc721/deposit-many.md'><h1 id="depositmany">depositMany</h1>
<p><code>depositMany</code> method can be used to deposit multiple token from ethereum to polygon chain.</p>
<pre><code>const erc721RootToken = posClient.erc721(&lt;root token address&gt;, true);

const result = await erc721RootToken.depositMany([&lt;token id1&gt;,&lt;token id2&gt;], &lt;user address&gt;);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        