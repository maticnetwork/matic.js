---
Title: 'Transaction'
Keywords: 'transaction, api, query, indexeddb, jsstore'
Description: 'learn how to use transaction in jsstore'
---

IndexedDB is a pure transactional database which means all the query is executed using the transaction.

JsStore provides - 'transaction' api for executing transaction.

```
await connection.transaction({
    tables: ['Customers'], // list of tables which will be used inside a transaction
    method: "buyProducts" // name of method which implements transaction
    data: any // pass any data , that will be used in runing transaction
});
```

<br>
## How to implement a transaction
<br>

JsStore takes a method name in transaction api, which is called with a context.

The context is an object which contains following props -

- start - start the transaction.
- select
- count
- update
- remove
- insert

- setResult - setResult accepts key and value. setResult is used to save the value which will be returned when transaction completes. The transaction returns an object, the object is in form of key and value which is set using setResult.

- abort - abort is used to abort the transaction.

- getResult - getResult is used to get the value setted by setResult.

- data - value passed in transaction api as data.

The transaction method should be -

- Accessible - so that it can be called.
- Should not have any asychronous logic except calling context apis

<br>
### Accessiblity in web worker
<br>
When using jsstore with a web worker - you can use <a href="/tutorial/import-scripts">importScripts</a> to import your scripts which contains your transaction methods.

```
await importSripts("transaction.js");

```

after script is imported your method is now available inside the jsstore web worker.
<br>
<br>

### Accessiblity without web worker

<br>
you can create a method anywhere and make it available on window.

```
function buyProducts(){

}

// if method not available on window, otherwise no need
window.buyProducts = buyProducts;
```

Let's see a example - Consider a situation where a customer buy some products and customer is new.

So the steps will be -

1. Add new customer - insert in the table - "Customer"
2. add new order - insert new order for the above customer
3. Insert OrderDetails
4. Update products - reduce the quantity of product available.
5. Calculate total price

```
FileName -  transaction.js

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

    const orderDetails = ctx.data.orderDetails.map((value) => {
        value.orderId = newOrder.orderId
        return value;
    });

    const insertedOrderDetails = await ctx.insert({
        into: 'orderDetails',
        values: orderDetails,
    })

    // update the product inventory and evaluate price

    ctx.setResult('totalPrice', 0); //initiating totalPrice

    ctx.data.orderDetails.forEach((orderDetail, index) => {
        const where = {
            productId: orderDetail.productId
        };

        const updateProduct = async () => {
            const productUpdated = await ctx.update({
                in: 'products',
                where: where,
                set: {
                    unit: {
                        '-': orderDetail.quantity
                    }
                }
            });
            if (productUpdated < 0) {
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

```

<div class="margin-top-30px top-border margin-bottom-20px"></div>
## Accessibilty
<br>

### If using web worker

```
// import scripts first, so that transaction methods becomes available

await connection.importScripts("./transaction.js");
```

### Without web worker

```
window.buyProducts = buyProducts;
```

<div class="margin-top-30px top-border margin-bottom-20px"></div>
Now method is accessible and can be executed, let's call the transaction api -

```
var result = await connection.transaction({
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
```

<div class="margin-top-30px top-border margin-bottom-20px"></div>
Few important things to make sure you are using transaction in right way -

- Transaction should be light weight. Dont write too many or heavy logics inside it. The reason is - the indexeddb transaction is asyc and automatically commited and so jsstore.

- There may be situation where you have a heavy logic, in that case - calculate the result and put it in data option.

<p class="margin-top-40px center-align">
    <button class="btn info btnNext">Next</button>
</p>
