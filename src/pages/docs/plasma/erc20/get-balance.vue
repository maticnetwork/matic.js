<template><Layout title='getBalance ERC20 Plasma' description='Get started with maticjs' keywords='pos client, erc20, getBalance, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/plasma/erc20/get-balance.md'><h1 id="getbalance">getBalance</h1>
<p><code>getBalance</code> method can be used to get the balance of user. It is available on both child and parent token.</p>
<pre><code>const erc20Token = plasmaClient.erc20(&lt;token address&gt;);

// get balance of user
const balance = await erc20Token.getBalance(&lt;userAddress&gt;);
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        