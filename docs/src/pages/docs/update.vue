<template><Layout title='Update' description='learn how to update data in indexedb using jsstore' keywords='update, api, query, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/update.md'><p>Update is used to modify the existing records in a table. You can use Where to filter records.</p>
<h4 id="sql">Sql</h4>
<pre><code>Update Table_Name;
Set
    column1 = value1,
    column2 = value2,
Where
    column3=some_value
and
    column4=some_another_value;
</code></pre>
<h4 id="jsstore">JsStore</h4>
<pre><code>var noOfRowsUpdated = await connection.update({ 
      in: "Table_Name",
    set: {
        column1: value1,
        column2: value2
    },
    where: {
        column3: some_value,
        column4: some_another_value
    }
});

alert(noOfRowsUpdated + ' rows updated');
</code></pre>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=update(%7B%0A%20%20%20%20in%3A%20%22Customers%22%2C%0A%20%20%20%20set%3A%20%7B%0A%20%20%20%20%20%20%20%20contactName%3A%20'Ujjwal'%2C%0A%20%20%20%20%20%20%20%20city%3A%20'Bhubaneswar'%0A%20%20%20%20%7D%2C%0A%20%20%20%20where%3A%20%7B%0A%20%20%20%20%20%20%20%20customerId%3A%205%0A%20%20%20%20%7D%0A%7D)%3B%0A">Example</a>
    <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        