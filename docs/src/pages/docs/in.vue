<template><Layout title='In' description='learn how to use in query in indexedb using jsstore' keywords='in, sql, query, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/in.md'><p>In allows you to specify multiple values in Where query. It is a shorthand for multiple or query.</p>
<h4 id="sqlwhere">Sql (Where)</h4>
<pre><code>Select * From Table_Name;
Where
Column_Name In (value1, value2, ...)
</code></pre>
<h4 id="jsstore">JsStore</h4>
<pre><code>connection.select({
    from: "Table_Name",
    where: {
        Column_Name: { 
            in: [value1, value2, ...]
        }
    }
}).then(function(results) {
    //results will be array of objects.
    console.log(results);
}).catch(function(error) {
    alert(error.message);
});
</code></pre>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20%22Customers%22%2C%0A%20%20%20%20where%3A%7B%0A%20%20%20%20%20%20%20%20country%3A%7Bin%3A%5B'Germany'%2C%20'France'%2C%20'UK'%5D%7D%0A%20%20%20%20%7D%0A%7D)%3B%0A">Example</a>
    <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        