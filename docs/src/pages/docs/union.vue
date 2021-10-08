<template><Layout title='Union' description='Union is an api which combine the result of two or more select query.' keywords='union, api, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/union.md'><p>union api combine the result of two or more select query and remove duplicate records.</p>
<h2 id="usecase">Use Case</h2>
<p><br>
There are times when one query is not able to fulfill the situation and so you need to use multiple query but now you are in a situation where some of the values are same in both results. <code>union</code> api is useful in these situation where it combines the results of multiple select query and removes the duplicate records.</p>
<p>e.g - Consider below queries -</p>
<p>1st query</p>
<pre><code>connection.select({
    from: 'Products',
    where: {
        price: {
            '&gt;': 10
        }
    }
})
</code></pre>
<p>2nd query</p>
<pre><code>connection.select({
    from: 'Products',
    where: {
        price: {
            '&gt;': 50
        }
    }
})
</code></pre>
<p>now in the above two queries - results from first query will have some records existing in results of 2nd query.</p>
<p>so using union we will combine these two results and query will be -</p>
<pre><code>var results = await connection.union([
    {
        from: 'Products',
        where: {
            price: {
                '&gt;': 10
            }
        }
    },
    {
        from: 'Products',
        where: {
            price: {
                '&gt;': 50
            }
        }
    }
])
</code></pre>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=union(%5B%7B%0A%20%20%20%20%20%20%20%20from%3A%20'Products'%2C%0A%20%20%20%20%20%20%20%20where%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20price%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20'%3E'%3A%2010%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20from%3A%20'Products'%2C%0A%20%20%20%20%20%20%20%20where%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20price%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20'%3E'%3A%2050%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%5D)">Example</a>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        