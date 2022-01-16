<template><Layout title='deposit erc721 POS  ' description='Get started with maticjs' keywords='pos client, erc721, deposit, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/pos/erc721/deposit.md'><h1 id="deposit">deposit</h1>
<p><code>deposit</code> method can be used to deposit a token from ethereum to polygon chain.</p>
<pre><code>const erc721RootToken = posClient.erc721(&lt;root token address&gt;, true);

const result = await erc721RootToken.deposit(&lt;token id&gt;, &lt;user address&gt;);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        