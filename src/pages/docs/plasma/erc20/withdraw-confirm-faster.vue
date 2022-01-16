<template><Layout title='withdraw challenge faster ERC20 POS ' description='Get started with maticjs' keywords='pos client, erc20, withdrawConfirmFaster, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/plasma/erc20/withdraw-confirm-faster.md'><h1 id="withdrawconfirmfaster">withdrawConfirmFaster</h1>
<p><code>withdrawConfirmFaster</code> method is the second step in the plasma withdraw process. In this step, proof of your burn transaction (first transaction) is submitted and an erc721 token of equivalent value is created.</p>
<p>After this process is successful, challenge period is started and upon completion of the the challenge period, user can get back the withdrawn amount to their account on the root chain.</p>
<p>The challenge period is 7 days for mainnet.</p>
<div class="highlight mb-20px mt-20px">
It is fast because it generates proof in the backend. You need to configure <a href="docs/set-proof-api">setProofAPI</a>
</div>
<p><strong>Note</strong>- withdrawStart transaction must be checkpointed in order to challenge the withdraw.</p>
<pre><code>import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20Token = plasmaClient.erc20(&lt;token address&gt;, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawConfirmFaster(&lt;burn tx hash&gt;);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
</code></pre>
<p>Once challenge period is completed, <code>withdrawExit</code> can be called to exit the withdraw process and get back the withdrawn amount.</p></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        