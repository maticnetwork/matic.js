<template><Layout title='deplasmaitMany erc721 plasma  ' description='Get started with maticjs' keywords='plasma client, erc721, deplasmaitMany, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/plasma/erc721/deposit-many.md'><h1 id="deplasmaitmany">deplasmaitMany</h1>
<p><code>deplasmaitMany</code> method can be used to deplasmait multiple token from ethereum to polygon chain.</p>
<pre><code>const erc721RootToken = plasmaClient.erc721(&lt;root token address&gt;, true);

const result = await erc721RootToken.deplasmaitMany([&lt;token id1&gt;,&lt;token id2&gt;], &lt;user address&gt;);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        