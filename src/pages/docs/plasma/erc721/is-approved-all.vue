<template><Layout title='isApprovedAll ERC721 plasma' description='Get started with maticjs' keywords='plasma client, erc721, isApprovedAll, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/plasma/erc721/is-approved-all.md'><h1 id="isapprovedall">isApprovedAll</h1>
<p><code>isApprovedAll</code> method checks if all token is approved. It returns boolean value.</p>
<pre><code>const erc721Token = plasmaClient.erc721(&lt;token address&gt;, true);

const result = await erc721Token.isApprovedAll(&lt;user Address&gt;);
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        