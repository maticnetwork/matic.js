<template><Layout title='Plugin' description='Using plugin you can inject your code into matic.js' keywords='plugin, api type, read, write, polygon' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/advanced/plugin.md'><h1 id="plugin">Plugin</h1>
<p>Using plugin you can inject your code into <code>matic.js</code>. It can be used to write common set of generic codes which can be provided to anyone using a package.</p>
<div class="highlight">
Plugin makes the `matic.js` light weight as it implements only important logical part.
</div>
<p><br>
Infact web3 library is supported using plugin which allows us to use our favourite library.</p>
<h3 id="plugindevelopment">Plugin development</h3>
<p>Plugin is a class which implements <code>IPlugin</code>.</p>
<pre><code>import { IPlugin } from "@maticnetwork/maticjs";

export class MyPlugin implements IPlugin {

    // variable matic is - default export of matic.js
    setup(matic) {

        // get web3client
        const web3Client = matic.Web3Client ;
    }
}
</code></pre>
<p>As you can see - you just need to implement a <code>setup</code> method which will be called with default export of <code>matic.js</code>.</p>
<h3 id="useplugin">Use Plugin</h3>
<p><code>matic.js</code> expose <code>use</code> method for using a plugin.</p>
<pre><code>import { use } from '@maticnetwork/maticjs'

use(MyPlugin)
</code></pre>
<p>You can use multiple plugins and they will be called in the same order as they are declared.</p>
<p><strong>Some plugin repo are -</strong></p>
<ul>
<li><a href="https://github.com/maticnetwork/maticjs-web3">Matic web3.js</a></li>
<li><a href="https://github.com/maticnetwork/maticjs-ethers">Matic ethers</a></li>
<li><a href="https://github.com/maticnetwork/fx-portal.js">FxPortal.js</a></li>
</ul></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        