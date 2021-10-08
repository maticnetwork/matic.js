<template><Layout title='Multi Entry' description='MultiEntry allows you to query array value in a column.' keywords='multi entry, option, column, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/multi-entry.md'><p>consider these values in a table</p>
<pre><code>var values = [
    {
        name: "Ray",
        tags: ["apple", "banana", "beer"]
    },
    {
        name: "Scott",
        tags: ["beer"]
    },
    {
        name: "Marc",
        tags: ["mongo", "jenkins","jsstore"]
    }
];
</code></pre>
<p>now you want to fetch records whose tags is 'mongo'. So a simple select query will be -</p>
<pre><code>const results = await connection.select({
    from: 'people',
    where: {
        tags: 'mongo'
    }
});
</code></pre>
<p>Here results will be always empty array, because indexeddb does not know anything about 'mongo' since it has stored an array value.</p>
<p>In order to solve this problem - IndexedDb provides an option 'multi entry'.</p>
<div class="highlight">
MultiEntry lets you search inside a column with array values. MultiEntry basically creates index for items in array column.
</div>
<p><br>In this case - you will have to enable <code>multiEntry</code> option for column "tags".</p>
<p>Here is an example database schema -</p>
<pre><code>var people = {
    name: 'people',
    columns: {
        name: {
            unique: true,
            dataType: JsStore.DATA_TYPE.String
        },
        tags: {
            dataType: JsStore.DATA_TYPE.Array,
            multiEntry: true
        }
    }
};

var dataBase = {
    name: 'MultiEntryTest',
    tables: [people]
};
</code></pre>
<p><strong>Note :-</strong> <code>multiEntry</code> will only work for plain values i.e string, number but not for compound types like json data or array. Because indexedDb provides one level indexing not multilevel.</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        