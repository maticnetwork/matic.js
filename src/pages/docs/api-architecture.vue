<template><Layout title='API Architecture' description='The library follows common api architecture throughout' keywords='api architecture, api type, read, write, polygon' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/api-architecture.md'><p>The library follows common api architecture throughout and the APIs are divided into two types -</p>
<ol>
<li>Read API</li>
<li>Write API</li>
</ol>
<h2 id="readapi">Read API</h2>
<p>Read APIs does not publish anything on blockchain, so it does not consume any gas. Example of read APIs are - <code>getBalance</code>, <code>isWithdrawExited</code> etc.</p>
<p>Let's see an example of read API -</p>
<pre><code>const erc20 = posClient.erc20('&lt;token address&gt;');
const balance = await erc20.getBalance('&lt;user address&gt;')
</code></pre>
<p>read APIs are very simple and returns result directly.</p>
<h2 id="2writeapi">2. Write API</h2>
<p>Write APSs publish some data on the blockchain, so it consumes gas. Example of write APIs are - <code>approve</code>, <code>deposit</code> etc.</p>
<p>When you are calling a write API - you need two data from the result.</p>
<ol>
<li>TransactionHash</li>
<li>TransactionReceipt</li>
</ol>
<p><br>
Let's see an example of write API and get the transactionhash and receipt -</p>
<pre><code>const erc20 = posClient.erc20('&lt;token address&gt;');

// send the transaction
const result = await erc20.approve(10);

// get transaction hash

const txHash = await result.getTransactionHash();

// get receipt

const receipt = await result.getReceipt();
</code></pre>
<h3 id="transactionoption">Transaction option</h3>
<p>There are some configurable options that are available for all API's. These configurations can be passed in parameters.</p>
<p>Available configurations are -</p>
<ul>
<li>from?: string | number - The address transactions should be made from.</li>
<li>to?: string - The address transactions should be made to.</li>
<li>value?: number | string | BN - The value transferred for the transaction in wei.</li>
<li>gasLimit?: number | string - The maximum gas provided for a transaction (gas limit).</li>
<li>gasPrice?: number | string | BN - The gas price in wei to use for transactions.</li>
<li>data?: string - The byte code of the contract.</li>
<li>nonce?: number;</li>
<li>chainId?: number;</li>
<li>chain?: string;</li>
<li>hardfork?: string;</li>
<li>returnTransaction?: boolean - making it true will return the transaction object which can be used to send transaction manually.</li>
</ul>
<p><br>
Let's see an example by configuring the gasPrice -</p>
<pre><code>const erc20RootToken = posClient.erc20(&lt;root token address&gt;,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100, {
    gasPrice: '4000000000',
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        