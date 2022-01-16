<template><Layout title='approveAll erc721 plasma  ' description='Get started with maticjs' keywords='plasma client, erc721, approveAll, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/plasma/erc721/approve-all.md'><h1 id="approve">approve</h1>
<p><code>approveAll</code> method can be used to approve all tokens.</p>
<pre><code>const erc721RootToken = plasmaClient.erc721(&lt;root token address&gt;, true);

const approveResult = await erc721RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        