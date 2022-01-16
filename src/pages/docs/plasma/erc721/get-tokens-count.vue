<template><Layout title='getTokensCount ERC721 plasma' description='Get started with maticjs' keywords='plasma client, erc721, getTokensCount, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/plasma/erc721/get-tokens-count.md'><h1 id="gettokenscount">getTokensCount</h1>
<p><code>getTokensCount</code> method returns tokens count for specified user.</p>
<pre><code>const erc721Token = plasmaClient.erc721(&lt;token address&gt;);

const result = await erc721Token.getTokensCount(&lt;user address&gt;);
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        