<template><Layout title='withdrawStart erc721 POS  ' description='Get started with maticjs' keywords='pos client, erc721, withdrawStart, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/pos/erc721/withdraw-start.md'><h1 id="withdrawstart">withdrawStart</h1>
<p><code>withdrawStart</code> method can be used to initiate the withdraw process which will burn the specified token on polygon chain.</p>
<pre><code>const erc721Token = posClient.erc721(&lt;token address&gt;);

const result = await erc721Token.withdrawStart(&lt;token id&gt;);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        