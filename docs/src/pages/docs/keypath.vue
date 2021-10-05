<template><Layout title='keyPath' description='learn how to use keypath for querying faster in indexeddb' keywords='keypath, column, indexing, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/keypath.md'><p>keyPath is a option in column. It is used to add multiple index, so that query execution can be made faster. It takes an array of type string.</p>
<p>It is helpful in case - when you have large amount of data &amp; its taking long time.</p>
<p>e.g - Lets take a table name with cities having column pinCodes &amp; name</p>
<pre><code>var table = {
    name: 'cities',
    columns: {
        cityName:{},
        pincCodes:{}
    }
}
</code></pre>
<p>We want to query on pincodes &amp; name so a select query will be like this - </p>
<pre><code>connection.select({
    from: 'cities',
    where: {
        pinCodes: 12345,
        name: 'london'
    }
})
</code></pre>
<p>Now lets define the table using keyPath </p>
<pre><code>var table = {
    name: 'cities',
    columns: {
        cityName:{},
        pincCodes:{},
        cityPincodes:{keyPath:['cityName','pinCodes']}
    }
}
</code></pre>
<p>and now new query can be written as - </p>
<pre><code>connection.select({
    from: 'cities',
    where: {
        cityPincodes: ['london',12345] // order of values should be same as what has been defined in keyPath
    }
})
</code></pre>
<p>Note :- Please compare between query execution time if there is no difference or very less then dont use keyPath. Adding multiple index will increase the db size which is limited for users.</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        