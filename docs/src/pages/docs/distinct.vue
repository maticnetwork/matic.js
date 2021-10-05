<template><Layout title='Distinct' description='Distinct is used to return unique set of results.' keywords='distinct, select, query, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/distinct.md'><p>Distinct is used to return the unique set of result. Distinct filters the result for all columns together except Primary column, since Primary column will make the result always unique.</p>
<p><strong>Note :-</strong> If you want to return the distinct results based on some columns, then you should use GroupBy.</p>
<h4 id="sqlwhere">Sql (Where)</h4>
<pre><code>Select Distinct * From Table_Name;
</code></pre>
<h4 id="jsstore">JsStore</h4>
<pre><code>const results = await connection.select({
    from: "Table_Name",
    distinct: true, // optional boolean value - default false
})

 //results will be array of objects.
console.log(results);
</code></pre>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20%22Customers%22%2C%0A%20%20%20%20distinct%3Atrue%20%2F%2F%20boolean%20value%0A%7D)%3B%0A">Example</a>
    <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        