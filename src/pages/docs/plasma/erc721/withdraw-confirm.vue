<template><Layout title='withdrawChallenge erc721 plasma  ' description='Get started with maticjs' keywords='plasma client, erc721, withdrawChallenge, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/plasma/erc721/withdraw-confirm.md'><h1 id="withdrawconfirm">withdrawConfirm</h1>
<p><code>withdrawConfirm</code> method is the second step in plasma withdraw process. In this step, proof of your burn transaction (first transaction) is submitted and an erc721 token of equivalent value is created.</p>
<p>After this process is successful, challenge period is started and upon completion of the the challenge period, user can get back the withdrawn amount in their account on root chain.</p>
<p>The challenge period is 7 days for mainnet.</p>
<pre><code>const erc721Token = plasmaClient.erc721(&lt;token address&gt;, true);

const result = await erc721Token.withdrawConfirm(&lt;burn tx hash&gt;);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        