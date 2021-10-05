<template><Layout title='Advanced Sql Example' description='Advanced sql example with respective jsstore query' keywords='advanced sql, example, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/adv-sql-example.md'><p>These are some examples of common use cases -</p>
<ul>
<li><strong>SQL</strong> - Select * from Table_Name where Column1=value1 or Column2=value2 or Column3=value3;</li>
</ul>
<pre><code>connection.select({
    from: "Table_Name",
    where: {
        Column1: value1,
        or: {
            Column2: value2,
            Column3: value3
        }
    }
});
</code></pre>
<ul>
<li><strong>SQL</strong> - Select * from Table_Name where Column1=value1 and (Column2=value2 or Column3=value3);</li>
</ul>
<pre><code>connection.select({
    from: "Table_Name",
    where: [{
            Column1: value1
        },
        {
            Column2: value2,
            or: {
                Column3: value3
            }
        }
    ]
});
</code></pre>
<ul>
<li><strong>SQL</strong> - Select * from Table_Name where Column1=value1 or (Column2=value2 and Column3=value3);</li>
</ul>
<pre><code>connection.select({
    from: "Table_Name",
    where: [{
            Column1: value1
        },
        {
            or: {
                Column2: value2,
                Column3: value3
            }
        }
    ]
});
</code></pre>
<p>Hope these examples will help you to write more complex queries. If you are not able to understand or write some complex queries - ask at stackoverflow mentioning jsstore and indexeddb.</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        