<template><Layout title='withdraw challenge ERC20 Plasma ' description='Get started with maticjs' keywords='plasma client, erc20, withdrawChallenge, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/plasma/erc20/withdraw-confirm.md'><h1 id="withdrawconfirm">withdrawConfirm</h1>
<p><code>withdrawConfirm</code> method is the second step in plasma withdraw process. In this step - proof of your burn transaction (first transaction) is submitted and an erc721 token of equivalent value is created.</p>
<p>After this process is successful - challenge period is started and upon completion of the the challenge period, user can get back the withdrawn amount to their account on the root chain.</p>
<p>The challenge period is 7 days for mainnet.</p>
<p><strong>Note</strong>- withdrawStart transaction must be checkpointed in order to challenge the withdraw.</p>
<pre><code>const erc20Token = plasmaClient.erc20(&lt;token address&gt;, true);

const result = await erc20Token.withdrawConfirm(&lt;burn tx hash&gt;);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
</code></pre>
<p>Once challenge period is completed, <code>withdrawExit</code> can be called to exit the withdraw process and get back the withdrawn amount.</p></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        