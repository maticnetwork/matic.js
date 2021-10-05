<template><Layout title='Skip' description='skip records in select query' keywords='skip, offset, select, query, indexeddb' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/select/skip.md'><p>Skip is used to specify the number of records to skip. It is available with only select.</p>
<h4 id="jsstore">JsStore</h4>
<pre><code>var results = await connection.select({
    from: "Table_Name",
    skip: number,
});
//results will be array of objects.
console.log(results);
</code></pre>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20%22Customers%22%2C%0A%20%20%20%20skip%3A%2010%0A%7D)%3B%0A">Example</a>
    <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        