<template><Layout title='transfer ERC721 plasma' description='Get started with maticjs' keywords='plasma client, erc721, transfer, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/plasma/erc721/transfer.md'><h1 id="transfer">Transfer</h1>
<p><code>transfer</code> method transfer tokens from one user to another user.</p>
<pre><code>const erc721Token = plasmaClient.erc721(&lt;token address&gt;);

const result = await erc721Token.transfer(&lt;tokenid&gt;,&lt;from&gt;,&lt;to&gt;);
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        