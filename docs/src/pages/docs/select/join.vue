<template><Layout title='Join' description='learn how to use join in indexedb using jsstore' keywords='indexeddb, join, left, inner, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/select/join.md'><p>JsStore supports two joins - Inner &amp; Left.</p>
<h4 id="sqlinnerjoinbetweentwotables">Sql (inner join between two tables)</h4>
<pre><code>Select * From Table1;
Inner Join Table2
On Table1.common_field = Table2.common_field
Where
Table1.Column1=some_value
And
Table2.Column1=some_another_value
</code></pre>
<h4 id="jsstore">JsStore</h4>
<pre><code>var results = await connection.select({
    from: table1 name,
    where: {
        [column name]: some value
    },
    join: {
        with: table2_name,
        on: "table1.common_field=table2.common_field",
        type:"inner",
        where: {
            [column name]: some value
        }
    }
});
console.log(results);
</code></pre>
<p><strong>Note :-</strong> you can also use - WhereIn, Skip, Order By and limit just like where has been used in the above example.</p>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20'Orders'%2C%0A%20%20%20%20join%3A%20%7B%0A%20%20%20%20%20%20%20%20with%3A%20'Customers'%2C%0A%20%20%20%20%20%20%20%20on%3A%20%22Orders.customerId%3DCustomers.customerId%22%0A%20%20%20%20%7D%0A%7D)%3B">Example</a>
    <button class="btn info btnNext">Next</button>
</p>
<div class="margin-top-30px top-border margin-bottom-20px"></div>
<p><code>join</code> has following properties -</p>
<ul>
<li><p>with : string // name of table to join</p></li>
<li><p>on : string // join condition eg - table1.property = table2.property</p></li>
<li><p>as : object // rename some column name in order to avoid the column match with other tables</p></li>
</ul>
<p>e.g - if a column customerId is present in both table, then a column match error will be thrown &amp; in this situation you can use <code>as</code> to resolve the error.</p>
<pre><code>connection.select({
    from: table1 name,
    join: {
        with: table2_name,
        on: "table1.common_field=table2.common_field",
        as: {
            customerId: table2_customerId
        }
    }
});
</code></pre>
<ul>
<li><p>where // to filter</p></li>
<li><p>order // for ordering data - but unlike query without join, order here is little different. You need to provide query along with table name in the form of [tablename].[columnName]</p></li>
<li><p>groupBy // for grouping</p></li>
<li><p>aggregate // aggregation of data</p></li>
</ul>
<div class="margin-top-30px top-border margin-bottom-20px"></div>
<h4 id="sqlinnerjoinbetweenthreetables">Sql (inner join between three tables)</h4>
<pre><code>Select * From Table1;
Inner Join Table2
On Table1.common_field = Table2.common_field
Inner Join Table3
On Table1.some_column = Table3.some_common_column
</code></pre>
<h4 id="jsstore-1">JsStore</h4>
<pre><code>var results = await connection.select({
    from: table1_name,
    join:[{
        with:table2_name,
        on: "table1.common_field=table2.common_field"
    },{
        with:table3_name,
        on: "table1.common_field=table3.common_field"
    }]
});
console.log(results);
</code></pre>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20'Orders'%2C%0A%20%20%20%20join%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20with%3A%20'Customers'%2C%0A%20%20%20%20%20%20%20%20on%3A%20%22Orders.customerId%3DCustomers.customerId%22%0A%20%20%20%20%7D%2C%7B%0A%20%20%20%20%20%20%20%20with%3A%22Shippers%22%2C%0A%20%20%20%20%20%20%20%20on%3A%22Orders.shipperId%3DShippers.shipperId%22%0A%20%20%20%20%7D%5D%0A%7D)%3B">Example</a>
    <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        