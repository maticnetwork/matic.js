<template><Layout title='deplasmait erc721 plasma  ' description='Get started with maticjs' keywords='plasma client, erc721, deplasmait, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/plasma/erc721/safe-deposit.md'><h1 id="safedeposit">safeDeposit</h1>
<p><code>safeDeposit</code> method can be used to deposit a token from ethereum to polygon chain.</p>
<pre><code>const erc721RootToken = plasmaClient.erc721(&lt;root token address&gt;, true);

const result = await erc721RootToken.safeDeposit(&lt;token id&gt;, &lt;user address&gt;);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        