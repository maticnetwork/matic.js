<template><Layout title='Order By' description='learn how to use order data in indexeddb' keywords='order by, sort by, select, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/select/order-by.md'><p>Order By is used to sort the data in ascending or descending order, based on any column.</p>
<h4 id="sql">Sql</h4>
<pre><code>Select * from Table_Name Order by column_name sort_type;
</code></pre>
<h4 id="jsstore">JsStore</h4>
<pre><code>var results = await connection.select({
    from: "Table_Name",
    order: {
        by: column_name,
        type: sort_type //supprted sort type is - asc,desc
    }
});
//results will be array of objects.
console.log(results);
</code></pre>
<p>Option order has following properties -</p>
<ul>
<li><p>by: string; // sorting column name</p></li>
<li><p>type: string; // sorting type - asc/desc, default is asc</p></li>
<li><p>idbSorting: boolean // whether to do sorting by indexeddb or by jsstore, default - true</p></li>
</ul>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20%22Customers%22%2C%0A%20%20%20%20order%3A%20%7B%0A%20%20%20%20%20%20%20%20by%3A%20'country'%2C%0A%20%20%20%20%20%20%20%20type%3A%20%22desc%22%0A%20%20%20%20%7D%0A%7D)%3B%0A">Example</a>
</p>
<h2 id="orderbymultiplecolumn">Order by multiple column</h2>
<p><br>For ordering by multiple column - you need to provide all order object value in an array</p>
<pre><code>var results = await connection.select({
    from: "Table_Name",
    order: [{
        by: column_name1,
        type: sort_type //supprted sort type is - asc,desc
    },
    {
        by: column_name2,
        type: sort_type //supprted sort type is - asc,desc
    }]
});
//results will be array of objects.
console.log(results);
</code></pre>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20%22Customers%22%2C%0A%20%20%20%20order%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20by%3A%20'country'%2C%0A%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20%20%20by%3A%20'city'%0A%20%20%20%20%7D%5D%0A%7D)%3B">Example</a>
</p>
<h2 id="orderbywhenusingjoin">Order by when using join</h2>
<p><br>
Unlike query without join, order here is little different. You need to provide query along with table name in the form of [tablename].[columnName]</p>
<p>e.g -</p>
<pre><code>select({
    from: "Student",
    join: {
        with: "StudentDetail",
        on: "Student.Name=StudentDetail.Name"
    },
    order: { by: 'Student.Order', type: 'asc' }
})
</code></pre>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20'Orders'%2C%0A%20%20%20%20join%3A%20%7B%0A%20%20%20%20%20%20%20%20with%3A%20'OrderDetails'%2C%0A%20%20%20%20%20%20%20%20on%3A%20'Orders.orderId%3DOrderDetails.orderId'%0A%20%20%20%20%7D%2C%0A%20%20%20%20order%3A%20%7B%0A%20%20%20%20%20%20%20%20by%3A%20'OrderDetails.orderId'%0A%20%20%20%20%7D%0A%7D)">Example</a>
     <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        