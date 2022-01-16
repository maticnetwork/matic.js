<template><Layout title='Introduction' description='Introduction to maticjs' keywords='maticjs, introduction, contract, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/v2/docs/introduction.md'><p>The <a href="https://github.com/maticnetwork/matic.js/"><code>@matic.js</code></a> client library makes it easy for developers, who may not be deeply familiar with smart contract development, to interact with the various components of Matic Network.</p>
<h2 id="quicksetup">Quick Setup</h2>
<p>Install the maticjs package via npm:</p>
<pre><code class="bash language-bash">$ npm install --save @maticnetwork/maticjs
</code></pre>
<h3 id="bridge">Bridge</h3>
<p>A bridge is basically a set of contracts that help in moving assets from the root chain to the child chain and vice versa.</p>
<p>There are primarily two bridges to move assets between Ethereum and Matic.</p>
<ol>
<li><a href="https://docs.matic.today/docs/develop/ethereum-matic/pos/getting-started/">POS</a></li>
<li><a href="https://docs.matic.today/docs/develop/ethereum-matic/plasma/getting-started">Plasma</a></li>
</ol>
<p>You can read more about Bridge <a href="https://docs.matic.today/docs/develop/ethereum-matic/pos/getting-started/">here</a></p>
<p>Matic.js provides you respective client to use these bridges</p>
<h4 id="plasmabridge">Plasma Bridge</h4>
<pre><code class="js language-js">const MaticPlasmaClient = require('@maticnetwork/maticjs')
</code></pre>
<p>Now using <code>MaticPlasmaClient</code> we can do transaction on plasma bridge. The client contains different apis to help you with the transaction.
These API are covered in <a href="/docs/plasma/initialize/">Plasma API</a>.</p>
<h4 id="posbridge">POS Bridge</h4>
<pre><code class="js language-js">const { MaticPoSClient } = require('@maticnetwork/maticjs')
</code></pre>
<p>Now using <code>MaticPoSClient</code> we can do transaction on POS bridge. The client contains different apis to help you with the transaction.
These API are covered in <a href="/docs/pos/initialize/">POS API</a>.</p>
<h3 id="someimportantlinks">Some important links</h3>
<ul>
<li><a href="https://github.com/maticnetwork/matic.js/tree/master/examples">Examples</a></li>
</ul></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/v2/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        