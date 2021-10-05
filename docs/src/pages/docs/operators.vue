<template><Layout title='Operators' description='list of operators available and their uses' keywords='operators, >, <, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/operators.md'><p>JsStore supports following operators : -</p>
<ul>
<li><strong>" &gt; " :</strong> Finds value greater than supplied value.</li>
<li><strong>" &lt; " :</strong> Finds value less than supplied value.</li>
<li><strong>" &gt;= " :</strong> Finds value greater than or equal to supplied value.</li>
<li><strong>" &lt;= " :</strong> Finds value less than or equal to supplied value.</li>
<li><strong>" - " :</strong> Finds value between two supplied value. Read <a href="/tutorial/between">between doc</a> for more info.</li>
<li><strong>" != " :</strong> Finds value not equal to supplied value. </li>
</ul>
<h4 id="sql">Sql</h4>
<pre><code>Select * From Table_Name;
Where
Column_Name &gt; some_value
</code></pre>
<h4 id="jsstore">JsStore</h4>
<pre><code>var results = await connection.select({
    from: "Table_Name",
    where: {
        Column_Name: {
            '&gt;': some_value
        },
    }
});
//results will be array of objects.
console.log(results);
</code></pre>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20%22Products%22%2C%0A%20%20%20%20where%3A%20%7B%0A%20%20%20%20%20%20%20%20price%3A%7B%0A%20%20%20%20%20%20%20%20%20%22%3E%22%3A20%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%7D)%3B%0A">Example</a>
    <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        