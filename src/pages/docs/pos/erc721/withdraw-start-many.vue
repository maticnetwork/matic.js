<template><Layout title='withdrawStartMany erc721 POS  ' description='Get started with maticjs' keywords='pos client, erc721, withdrawStartMany, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/pos/erc721/withdraw-start-many.md'><h1 id="withdrawstartmany">withdrawStartMany</h1>
<p><code>withdrawStartMany</code> method can be used to initiate the withdraw process which will burn the multiple token on polygon chain.</p>
<pre><code>const erc721Token = posClient.erc721(&lt;root token address&gt;);

const result = await erc721Token.withdrawStartMany([&lt;token id1&gt;, &lt;token id2&gt;]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        