<template><Layout title='approveMax ERC20 Plasma' description='Get started with maticjs' keywords='plasma client, erc20, approveMax, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/plasma/erc20/approve-max.md'><h1 id="approvemax">approveMax</h1>
<p><code>approveMax</code> method can be used to approve max amount on root token.</p>
<pre><code>const erc20RootToken = plasmaClient.erc20(&lt;root token address&gt;, true);

const approveResult = await erc20Token.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        