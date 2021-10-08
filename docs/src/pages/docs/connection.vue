<template><Layout title='Connection' description='How to create connection in jsstore' keywords='database, connection, query, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/connection.md'><p>Connection in jsstore is instance of class <code>Connection</code>. All apis are called using connection.</p>
<h5 id="syntax">Syntax</h5>
<p><br></p>
<h3 id="withwebworker">With Web Worker</h3>
<pre><code>var connection = new JsStore.Connection(new Worker('jsstore worker path'));
</code></pre>
<p><strong>example</strong> - <a target="_blank" href="https://github.com/ujjwalguptaofficial/jsstore-examples/tree/master/simple_example">https://github.com/ujjwalguptaofficial/jsstore-examples/tree/master/simple_example</a></p>
<h3 id="withoutwebworker">Without web worker</h3>
<pre><code>var connection = new JsStore.Connection();
</code></pre>
<p><strong>example</strong> - <a target="_blank" href="https://github.com/ujjwalguptaofficial/jsstore-examples/tree/master/without_web_worker">https://github.com/ujjwalguptaofficial/jsstore-examples/tree/master/without<em>web</em>worker</a></p>
<div class="margin-top-30px top-border margin-bottom-20px"></div>
<p><br></p>
<h2 id="howtocreateconnectioninwebpack">How to create connection in webpack</h2>
<p><br></p>
<ol>
<li><p>Install jsstore using npm or yarn - <code>npm i jsstore</code></p></li>
<li><p>Install file-loader - <code>npm i file-loader -D</code></p></li>
<li><p>Create a file jsstore<em>con.js or jsstore</em>con.ts (for typescript). This file will be used to create the jsstore connection. You can choose any file name.</p></li>
<li><p>Inside the file jsstore_con.js, write below code -</p></li>
</ol>
<pre><code>const getWorkerPath = () =&gt; {

    // return dev build when env is development
    if (process.env.NODE_ENV === 'development') {

        return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.js");

    }
    else { // return prod build when env is production

        return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js");

    }
};

const workerPath = getWorkerPath();
export const connection = new JsStore.Connection(new Worker(workerPath));
</code></pre>
<ol start="5">
<li>Step 4 creates a connection and export the connection variable. You can import this connection variable to anywhere in your code.</li>
</ol>
<p><br>In the above code we are using <strong>file-loader</strong> to load jsstore worker file but you are free to use your own technique to load jsstore worker. The simplest approach is download jsstore.worker.js and then specify its path.</p>
<p>If you are finding difficult to understand, please take a look at <a href="https://github.com/ujjwalguptaofficial/jsstore-examples">examples</a> or our <a href="https://medium.com/jsstore">medium page</a></p>
<p><br>
<strong>Important points :-</strong></p>
<ul>
<li>The connection variable will be used to execute the further query.</li>
<li>A connection will handle one db at a time.</li>
<li>Do not create multiple connection for one db.</li>
</ul>
<p class="margin-top-40px center-align">
      <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        