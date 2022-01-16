<template><Layout title='getAllowance ERC20 Plasma' description='Get started with maticjs' keywords='plasma client, erc20, getAllowance, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/plasma/erc20/get-allowance.md'><h1 id="getallowance">getAllowance</h1>
<p><code>getAllowance</code> method can be used to get the approved amount for user.</p>
<pre><code>const erc20Token = plasmaClient.erc20(&lt;token address&gt;, true);

const balance = await erc20Token.getAllowance(&lt;userAddress&gt;);
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        