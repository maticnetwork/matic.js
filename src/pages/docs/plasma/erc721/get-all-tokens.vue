<template><Layout title='getAllTokens ERC721 plasma' description='Get started with maticjs' keywords='plasma client, erc721, getAllTokens, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/plasma/erc721/get-all-tokens.md'><h1 id="getalltokens">getAllTokens</h1>
<p><code>getAllTokens</code> method returns all tokens owened by specified user.</p>
<pre><code>const erc721Token = plasmaClient.erc721(&lt;token address&gt;);

const result = await erc721Token.getAllTokens(&lt;user address&gt;, &lt;limit&gt;);
</code></pre>
<p>you can also limit the tokens by specifying limit value in second parmater.</p></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        