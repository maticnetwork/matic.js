<template><Layout title='Helpers' description='jsstore helpers methods' keywords='helpers, api, query, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/helpers.md'><h4 id="setlogstatus">setLogStatus</h4>
<p>It sets the status of log. When supplied true - JsStore logs query flow in console. This is helpful in debugging.</p>
<pre><code>connection.setLogStatus(true);
</code></pre>
<h4 id="getdbversion">getDbVersion</h4>
<p>It returns the current Database version.</p>
<pre><code>connection.getDbVersion(db_name).then(function(version) {
    console.log(version)
})
</code></pre>
<h4 id="getdbschema">getDbSchema</h4>
<p>It returns the Database Schema.</p>
<pre><code>connection.getDbSchema(db_name).then(function(schema) {
    console.log(schema)
});
</code></pre>
<h4 id="getdblist">getDbList</h4>
<p>It returns list of database created using jsstore.</p>
<pre><code>connection.getDbList().then(function(result) {
    console.log(result)
});
</code></pre>
<h4 id="set">set</h4>
<p>It stores data in form of key and value in a special table. You can think of it is similar to localStorage but you can store every type of data using 'set' which is not the case with localStorage (can be stored only string).</p>
<p>Lets say you want to store user profile picture or may be some basic information, so that you can load it on page load.</p>
<pre><code>var userInfo = {
    name: 'ujjwal gupta',
    accountType: 'super_admin',
    profilePic: Blob Object // i am not creating it.

}
connection.set("user_info", userInfo).then(function() {
    console.log('value setted');
});
</code></pre>
<h4 id="get">get</h4>
<p>Get data from special table.</p>
<pre><code>connection.get("user_info").then(function(userInfo) {
    console.log(userInfo); 
});
</code></pre></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        