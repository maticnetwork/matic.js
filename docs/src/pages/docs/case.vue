<template><Layout title='Case' description='case is used to change stored value based on some condition.' keywords='case, query, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/case.md'><p>case is an option in select query which is used to change stored value based on some condition. It is similar to multiple if else statetement. So once a condition is true it is stopped and value is returned.</p>
<pre><code>const results = await connection.select({
    from: 'Customers',
    case: {
        city: [{
            '=': 'London',
            then: 'London UK'
        }, {
            then: 'World'
        }]
    }
})
</code></pre>
<p>You can use other operators symbol similar to '=' used above - '&gt;', '&gt;=, '&lt;' ,'&lt;=', '!='</p>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20'Customers'%2C%0A%20%20%20%20case%3A%20%7B%0A%20%20%20%20%20%20%20%20city%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20'%3D'%3A%20'London'%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20then%3A%20'London%20UK'%0A%20%20%20%20%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20then%3A%20'World'%0A%20%20%20%20%20%20%20%20%7D%5D%0A%20%20%20%20%7D%0A%7D)">Example</a>
</p>
<p><strong>Note : -</strong> </p>
<ul>
<li>If you want to return stored value instead of custom value - provide null value in <code>then</code> - <code>{ then:null }</code> </li>
<li>This is not used to filter values but to change value. To filter value <code>where</code> is used.</li>
</ul>
<div class="margin-top-30px top-border margin-bottom-20px"></div>
<h4 id="order">Order</h4>
<p><br>
case can be also used in order query to change the ordering of result.</p>
<p><strong>e.g -</strong> In Customers table : record contains values -  "Argentina", "Austria" , etc. in column "country". When sorting by coluntry in ascending order - the record "Argentina" comes first &amp; then "Austria". But for some reason we want Austria to comes first.</p>
<p>In this case we will have to use <code>case query</code> in <code>order</code> &amp; provide a value for "Austria" which is lesser than "Argentina".</p>
<pre><code>const results = await connection.select({
    from: 'Customers',
    order: {
        by: 'country',
        case: [{
            '=': 'Austria',
            then: "a" // telling value of 'Austria is a'
        }, {
            then: null
        }]
    }
})
</code></pre>
<p><strong>Note :-</strong> Use same data type as column in <code>then</code> value otherwise you might get some error. In the above example - i have provided string value "a", as country data type is string.</p>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20'Customers'%2C%0A%20%20%20%20limit%3A%2010%2C%0A%20%20%20%20order%3A%20%7B%0A%20%20%20%20%20%20%20%20by%3A%20'country'%2C%0A%20%20%20%20%20%20%20%20case%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20'%3D'%3A%20'Austria'%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20then%3A%20%22a%22%0A%20%20%20%20%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20then%3A%20null%0A%20%20%20%20%20%20%20%20%7D%5D%0A%20%20%20%20%7D%0A%7D)">Example</a>
</p>
<p>Another scenario is when you want to change order by column based on some condition. </p>
<pre><code>select({
    from: 'Customers',
    order: {
        by: {
            'country': [{
                '=': 'Spain',
                then: "city"
            }, {
                then: 'country'
            }]
        }
    }
})
</code></pre>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20'Customers'%2C%0A%20%20%20%20order%3A%20%7B%0A%20%20%20%20%20%20%20%20by%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20'country'%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20'%3D'%3A%20'Spain'%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20then%3A%20%22city%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20then%3A%20'country'%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%5D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%7D)">Example</a>
</p>
<h4 id="groupby">Group By</h4>
<p>case can be used in group by for grouping values dynamically.</p>
<p>e.g - </p>
<pre><code>const results = await connection.select({
    from: 'Products',
    groupBy: {
        'price': [{
            '&lt;=': 100,
            then: 'affordable item'
        }, {
            then: 'costly item'
        }]
    }
})
</code></pre>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20'Products'%2C%0A%20%20%20%20groupBy%3A%20%7B%0A%20%20%20%20%20%20%20%20'price'%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20'%3C%3D'%3A%20100%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20then%3A%20'affordable%20item'%0A%20%20%20%20%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20then%3A%20'costly%20item'%0A%20%20%20%20%20%20%20%20%7D%5D%0A%20%20%20%20%7D%0A%7D)">Example</a>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        