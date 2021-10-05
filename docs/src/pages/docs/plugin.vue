<template><Layout title='Plugin' description='Plugin can be used to write common set of generic codes' keywords='plugin, middleware, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/plugin.md'><p>Plugin can be used to write common set of generic codes which can be provided to anyone using a package. Using plugin you can inject apis or insert middleware.</p>
<p><a href="/tutorial/sqlweb">SqlWeb</a> is an example of plugin which add <code>$sql</code> api.</p>
<h2 id="howtocreateaplugin">How to create a plugin</h2>
<pre><code>export const AwesomePlugin = {

    // setup is called by jsstore, so all initialization should happen here
    setup: function(connection, params){

        connection.myApi = {
            insertIntoMyTable: function (data){
                connetion.insert({
                    into:"my_table",
                    values:[data]
                })
            }
        }

    }
}
</code></pre>
<p>In the above code we have created a plugin which add api <code>myApi</code> to insert data into specific table.</p>
<p>Now we need to add this plugin to jsstore connection.</p>
<pre><code>var connection = new JsStore.Connection();
connection.addPlugin(AwesomePlugin);
</code></pre>
<p>now plugin is installed and can be used. Let's use the api added by plugin</p>
<pre><code>connection.insertIntoMyTable({
    name:'ujjwal gupta'
})
</code></pre>
<p class="margin-top-40px center-align">
    <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        