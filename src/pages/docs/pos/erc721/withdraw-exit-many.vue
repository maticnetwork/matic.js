<template><Layout title='withdrawExitMany erc721 POS  ' description='Get started with maticjs' keywords='pos client, erc721, withdrawExitMany, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/pos/erc721/withdraw-exit-many.md'><h1 id="withdrawexitmany">withdrawExitMany</h1>
<p><code>withdrawExitMany</code> method can be used to approve all tokens.</p>
<pre><code>const erc721RootToken = posClient.erc721(&lt;root token address&gt;, true);

const approveResult = await erc721RootToken.withdrawExitMany(&lt;burn tx hash&gt;);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        