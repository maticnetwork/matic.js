<template><Layout title='isApproved ERC721 plasma' description='Get started with maticjs' keywords='plasma client, erc721, isApproved, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/plasma/erc721/is-approved.md'><h1 id="isapproved">isApproved</h1>
<p><code>isApproved</code> method checks if token is approved for specified tokenId. It returns boolean value.</p>
<pre><code>const erc721Token = plasmaClient.erc721(&lt;token address&gt;, true);

const result = await erc721Token.isApproved(&lt;tokenId&gt;);
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        