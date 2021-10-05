<template><Layout title='Intersect' description='import scripts in web worker' keywords='import scripts, transaction, query, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/intersect.md'><p>intersect api combine the result of two or more select query and take only common records between the queries result.</p>
<h2 id="usecase">Use Case</h2>
<p><br>
There are times when one query is not able to fulfill the situation and so you need to use multiple query but now you are getting duplicate records. <code>intersect</code> api is useful in these situation where it combines the results of multiple select query and takes only common records between them.</p>
<p>e.g - Consider below queries - </p>
<p>1st query </p>
<pre><code>connection.select({
    from: 'Products',
    where: {
        price: {
            '&gt;': 10
        }
    }
})
</code></pre>
<p>2nd query </p>
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
<p>so using intersect we will take common results between two results and query will be - </p>
<pre><code>var query1=  {
    from: 'Products',
    where: {
        price: {
            '&gt;': 10
        }
    }
};
var query2 = {
    from: 'Products',
    where: {
        price: {
            '&gt;': 50
        }
    }
};
var results = await connection.intersect({
    queries:[query1,query2]    
})
</code></pre>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=var%20query1%20%3D%20%7B%0A%20%20%20%20from%3A%20'Products'%2C%0A%20%20%20%20where%3A%20%7B%0A%20%20%20%20%20%20%20%20price%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20'%3E'%3A%2010%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%7D%3B%0Avar%20query2%20%3D%20%7B%0A%20%20%20%20from%3A%20'Products'%2C%0A%20%20%20%20where%3A%20%7B%0A%20%20%20%20%20%20%20%20price%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20'%3E'%3A%2050%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%7D%3B%0Aintersect(%7B%0A%20%20%20%20queries%3A%20%5Bquery1%2C%20query2%5D%0A%7D)">Example</a>
    <button class="btn info btnNext">Next</button>
</p>
<p class="margin-top-40px center-align">

</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        