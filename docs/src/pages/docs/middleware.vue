<template><Layout title='Middleware' description='Middleware can be used to modify queries' keywords='middleware, plugin, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/middleware.md'><div class="highlight">
Middleware is a function which has access to request and next callback and are called for each request in the same order as defined.
</div>
<p><br></p>
<p>Middleware can be used to listen to each query and modify if necessary.</p>
<p>e.g - Let's say i want to encode my data when being inserted to make sure its not readable or for security purpose.</p>
<h2 id="createmiddleware">Create Middleware</h2>
<pre><code>var connection = new JsStore.Connection();
connection.addMiddleware(function (request, next) {
    // request.name is name of api

    if(request.name=='insert'){
        // request.query is query supplied in each api

        encodeData(request.query)
    }

    // next is required to call to handle control to next middleware

    next();
});
</code></pre>
<p>now middleware is registered and can be used. Let's call a insert api</p>
<pre><code>connection.insert({
    into:"my_secure_table"
    values:[{
        password:'12345'
    }],
    // some extra information can be provided
    encryption:'md5'
})
</code></pre>
<p>Middleware can be also created and provided as package using <a href="/tutorial/plugin">plugin</a>.</p>
<p class="margin-top-40px center-align">
    <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        