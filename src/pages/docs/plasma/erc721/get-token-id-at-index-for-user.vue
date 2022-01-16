<template><Layout title='getTokenIdAtIndexForUser ERC721 plasma' description='Get started with maticjs' keywords='plasma client, erc721, getTokenIdAtIndexForUser, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/plasma/erc721/get-token-id-at-index-for-user.md'><h1 id="gettokenidatindexforuser">getTokenIdAtIndexForUser</h1>
<p><code>getTokenIdAtIndexForUser</code> method returns token id on supplied index for user.</p>
<pre><code>const erc721Token = plasmaClient.erc721(&lt;token address&gt;);

const result = await erc721Token.getTokenIdAtIndexForUser(&lt;index&gt;,&lt;user address&gt;);
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        