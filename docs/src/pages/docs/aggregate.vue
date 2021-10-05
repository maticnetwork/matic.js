<template><Layout title='Aggregate Functions' description='Aggreagte functions available in jsstore are count, sum, avg, max and min.' keywords='aggregate, count, avg, min, max, indexeddb' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/aggregate.md'><p>JsStore supports following aggregate functions : -</p>
<ul>
<li><strong>count :</strong> Returns the number of rows of specified column.</li>
<li><strong>sum :</strong> Returns the total sum of numeric column.</li>
<li><strong>avg :</strong> Returns the average value of numeric column.</li>
<li><strong>max :</strong> Returns the maximum value of specified column.</li>
<li><strong>min :</strong> Returns the minimum value of specified column.</li>
</ul>
<h4 id="sql">Sql</h4>
<pre><code>Select min(Column_Name) From Table_Name;
</code></pre>
<h4 id="jsstore">JsStore</h4>
<pre><code>const results = await connection.select({
    from: "Table_Name",
    aggregate: {
        min: Column_Name,
        // You can specify multiple columns at a time by providing columns name in an array.
        // count:['column1','column2']
    }
});
//aggregate result will be in the first row only.
console.log(results[0]);
</code></pre>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20%22Products%22%2C%0A%20%20%20%20aggregate%3A%20%7B%0A%20%20%20%20%20%20%20%20min%3A%20%22price%22%0A%20%20%20%20%7D%0A%7D)%3B">Example</a>
    <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        