<template><Layout title='withdraw exit ERC20 POS ' description='Get started with maticjs' keywords='pos client, erc20, withdrawExit, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/plasma/erc20/withdraw-exit.md'><h1 id="withdrawexit">withdrawExit</h1>
<p><code>withdrawExit</code> method can be used to exit the withdraw process once challenge period has been completed.</p>
<pre><code>const erc20RootToken = plasmaClient.erc20(&lt;root token address&gt;, true);

const result = await erc20Token.withdrawExit();

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        