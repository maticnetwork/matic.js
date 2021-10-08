<template><Layout title='Transaction' description='learn how to use transaction in jsstore' keywords='transaction, api, query, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/transaction.md'><p>IndexedDB is a pure transactional database which means all the query is executed using the transaction.</p>
<p>JsStore provides - 'transaction' api for executing transaction.</p>
<pre><code>await connection.transaction({
    tables: ['Customers'], // list of tables which will be used inside a transaction
    method: "buyProducts" // name of method which implements transaction
    data: any // pass any data , that will be used in runing transaction
});
</code></pre>
<p><br></p>
<h2 id="howtoimplementatransaction">How to implement a transaction</h2>
<p><br></p>
<p>JsStore takes a method name in transaction api, which is called with a context.</p>
<p>The context is an object which contains following props -</p>
<ul>
<li><p>start - start the transaction.</p></li>
<li><p>select</p></li>
<li><p>count</p></li>
<li><p>update</p></li>
<li><p>remove</p></li>
<li><p>insert</p></li>
<li><p>setResult - setResult accepts key and value. setResult is used to save the value which will be returned when transaction completes. The transaction returns an object, the object is in form of key and value which is set using setResult.</p></li>
<li><p>abort - abort is used to abort the transaction.</p></li>
<li><p>getResult - getResult is used to get the value setted by setResult.</p></li>
<li><p>data - value passed in transaction api as data.</p></li>
</ul>
<p>The transaction method should be -</p>
<ul>
<li>Accessible - so that it can be called.</li>
<li>Should not have any asychronous logic except calling context apis</li>
</ul>
<p><br></p>
<h3 id="accessiblityinwebworker">Accessiblity in web worker</h3>
<p><br>
When using jsstore with a web worker - you can use <a href="/tutorial/import-scripts">importScripts</a> to import your scripts which contains your transaction methods.</p>
<pre><code>await importSripts("transaction.js");
</code></pre>
<p>after script is imported your method is now available inside the jsstore web worker.
<br>
<br></p>
<h3 id="accessiblitywithoutwebworker">Accessiblity without web worker</h3>
<p><br>
you can create a method anywhere and make it available on window.</p>
<pre><code>function buyProducts(){

}

// if method not available on window, otherwise no need
window.buyProducts = buyProducts;
</code></pre>
<p>Let's see a example - Consider a situation where a customer buy some products and customer is new.</p>
<p>So the steps will be -</p>
<ol>
<li>Add new customer - insert in the table - "Customer"</li>
<li>add new order - insert new order for the above customer</li>
<li>Insert OrderDetails</li>
<li>Update products - reduce the quantity of product available.</li>
<li>Calculate total price</li>
</ol>
<pre><code>FileName -  transaction.js

async function buyProducts(ctx) {

    ctx.start(); // start the transaction

    const insertedCustomers = await ctx.insert({
        into: 'customers',
        values: [ctx.data.customer],
        return: true
    });

    const newCustomer = insertedCustomers[0];

    // insert order

    const order = {
        customerId: newCustomer.id,
        orderDate: new Date(),
    };

    const insertedOrders = await ctx.insert({
        into: 'orders',
        values: [order],
        return: true
    })

    const newOrder = insertedOrders[0];

    // insert orderDetail

    const orderDetails = ctx.data.orderDetails.map((value) =&gt; {
        value.orderId = newOrder.orderId
        return value;
    });

    const insertedOrderDetails = await ctx.insert({
        into: 'orderDetails',
        values: orderDetails,
    })

    // update the product inventory and evaluate price

    ctx.setResult('totalPrice', 0); //initiating totalPrice

    ctx.data.orderDetails.forEach((orderDetail, index) =&gt; {
        const where = {
            productId: orderDetail.productId
        };

        const updateProduct = async () =&gt; {
            const productUpdated = await ctx.update({
                in: 'products',
                where: where,
                set: {
                    unit: {
                        '-': orderDetail.quantity
                    }
                }
            });
            if (productUpdated &lt; 0) {
                ctx.abort("No orderDetails inserted");
            }
        };

        updateProduct();

        const products = await ctx.select({
            from: 'products',
            where: where
        })

        const product = results[0];
        const price = product.price * orderDetail.quantity
        ctx.setResult('totalPrice', ctx.getResult('totalPrice') + price);
    })
},
</code></pre>
<div class="margin-top-30px top-border margin-bottom-20px"></div>
<h2 id="accessibilty">Accessibilty</h2>
<p><br></p>
<h3 id="ifusingwebworker">If using web worker</h3>
<pre><code>// import scripts first, so that transaction methods becomes available

await connection.importScripts("./transaction.js");
</code></pre>
<h3 id="withoutwebworker">Without web worker</h3>
<pre><code>window.buyProducts = buyProducts;
</code></pre>
<div class="margin-top-30px top-border margin-bottom-20px"></div>
<p>Now method is accessible and can be executed, let's call the transaction api -</p>
<pre><code>var result = await connection.transaction({
    tables: ['customers', 'orders', 'products', 'orderDetails'], // list of tables which will be used in transaction
    method: "buyProducts"
    data: { // the transaction logic will be called with supplying data
        customer: {
            customerName: 'ujjwal gupta',
            address: 'bhubaneswar odisha',
            city: 'bhubaneswar',
            postalCode: 'asdf',
            country: 'india',
            email: 'sdfg@m.com'
        },
        orderDetails: [{
            productId: 1,
            quantity: 2
        }, {
            productId: 2,
            quantity: 4
        }]
    }
});
const totalPrice = result.totalPrice;
</code></pre>
<div class="margin-top-30px top-border margin-bottom-20px"></div>
<p>Few important things to make sure you are using transaction in right way -</p>
<ul>
<li><p>Transaction should be light weight. Dont write too many or heavy logics inside it. The reason is - the indexeddb transaction is asyc and automatically commited and so jsstore.</p></li>
<li><p>There may be situation where you have a heavy logic, in that case - calculate the result and put it in data option.</p></li>
</ul>
<p class="margin-top-40px center-align">
    <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        