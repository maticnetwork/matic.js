<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/v2/docs/plasma/processExits.md'><h1 id="processexit">Process Exit</h1>
<pre><code class="js language-js">matic.processExits(rootTokenAddress, options)
</code></pre>
<p>Call processExits after completion of challenge period, after that withdrawn funds get transfered to your account on mainchain</p>
<ul>
<li><code>rootTokenAddress</code> RootToken address</li>
<li><code>options</code> see <a href="#approveERC20TokensForDeposit">more infomation here</a></li>
<li><code>encodeAbi</code> must be boolean value. For Byte code of transaction, use <code>encodeAbi: true</code></li>
</ul>
<p>This returns <code>Promise</code> object, which will be fulfilled when transaction gets confirmed (when receipt is generated).</p>
<p>Example:</p>
<pre><code class="js language-js">matic.processExits('0xabcd...789', {
  from: '0xABc578455...',
})
</code></pre>
<hr /></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/v2/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        