<template><Layout title='Plasma ERC20' description='Get started with maticjs' keywords='plasma client, erc20, contract, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/plasma/erc20/index.md'><h1 id="erc20">ERC20</h1>
<p><code>plasmaClient</code> provides <code>erc20</code> method which helps you to interact with a erc20 token.</p>
<h2 id="childtoken">Child token</h2>
<pre><code>const childERC20Token = plasmaClient.erc20(&lt;child token address&gt;);
</code></pre>
<h2 id="roottoken">Root token</h2>
<p>Root token can be initiated by providing second parameter value as <code>true</code>.</p>
<pre><code>const parentERC20Token = plasmaClient.erc20(&lt;root token address&gt;, true);
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        