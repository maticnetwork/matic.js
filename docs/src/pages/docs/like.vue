<template><Layout title='Like' description='filter data using like operator' keywords='like, filter, query, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/like.md'><p>Like is used with Where to search for a specified pattern in a column. Currently We support only '%' character.</p>
<p>Some Examples of Like supported by JsStore -</p>
<ul>
<li><strong>Like 'a%' :</strong> Finds any values that starts with "a".</li>
<li><strong>Like '%a' :</strong> Finds any values that ends with "a".</li>
<li><strong>Like '%a%' :</strong> Finds any values that contains "a" at any position.</li>
</ul>
<h4 id="sql">Sql</h4>
<pre><code>Select * From Table_Name;
Where
Column_Name Like 'a%'
</code></pre>
<h4 id="jsstore">JsStore</h4>
<pre><code>var results = await connection.select({
    from: "Table_Name",
    where: {
        Column_Name: {
            like: 'a%'
        },
    }
});
//results will be array of objects.
console.log(results);
</code></pre>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20%22Customers%22%2C%0A%20%20%20%20where%3A%20%7B%0A%20%20%20%20%20%20%20%20customerName%3A%7B%20like%3A'%25or%25'%7D%0A%20%20%20%20%7D%0A%7D)%3B%0A">Example</a>
    <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        