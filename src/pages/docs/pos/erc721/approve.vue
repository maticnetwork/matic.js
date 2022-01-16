<template><Layout title='approve erc721 POS  ' description='Get started with maticjs' keywords='pos client, erc721, approve, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/pos/erc721/approve.md'><h1 id="approve">approve</h1>
<p><code>approve</code> method can be used to approve required amount on root token.</p>
<pre><code>const erc721RootToken = posClient.erc721(&lt;root token address&gt;,true);

const approveResult = await erc721RootToken.approve(&lt;token id&gt;);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        