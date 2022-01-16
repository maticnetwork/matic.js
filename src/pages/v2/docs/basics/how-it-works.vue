<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/v2/docs/basics/how-it-works.md'><h1 id="howitworks">How it works?</h1>
<p>The flow for asset transfers on the Matic Network is as follows:</p>
<ul>
<li>User deposits crypto assets in Matic contract on mainchain</li>
<li>Once deposited tokens get confirmed on the main chain, the corresponding tokens will get reflected on the Matic chain.</li>
<li>The user can now transfer tokens to anyone they want instantly with negligible fees. Matic chain has faster blocks (approximately ~ 1 second). That way, the transfer will be done almost instantly.</li>
<li>Once a user is ready, they can withdraw remaining tokens from the mainchain by establishing proof of remaining tokens on Root contract (contract deployed on Ethereum chain)</li>
</ul>
<h3 id="networkandversion">Network and version</h3>
<ul>
<li><p>Network is network name you want to use e.g mainnet or testnet</p></li>
<li><p>version is network verstion e.g v1, v2, mumbai</p></li>
</ul>
<h3 id="contractsandaddresses">Contracts and addresses</h3>
<p>You don't have to worry about contract addresses, giving correct network name and version will pickup respective addresses.</p>
<h3 id="faucet">Faucet</h3>
<p>https://faucet.matic.network</p></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/v2/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        