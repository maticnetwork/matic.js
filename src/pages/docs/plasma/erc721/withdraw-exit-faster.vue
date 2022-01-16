<template><Layout title='withdrawExitFaster erc721 plasma  ' description='Get started with maticjs' keywords='plasma client, erc721, withdrawExitFaster, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/plasma/erc721/withdraw-exit-faster.md'><h1 id="withdrawexitfaster">withdrawExitFaster</h1>
<p><code>withdrawExitFaster</code> method can be used to approve all tokens.</p>
<p>It is fast because it generates proof in backend. The backend can be configured with dedicated private rpc.</p>
<p><strong>Note</strong>- withdrawStart transaction must be checkpointed in order to exit the withdraw.</p>
<pre><code>const erc721RootToken = plasmaClient.erc721(&lt;root token address&gt;, true);

const approveResult = await erc721RootToken.withdrawExitFaster(&lt;burn tx hash&gt;);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        