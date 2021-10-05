---
Title: 'Initiate Database'
Keywords: 'initiate, database, table, column, indexeddb'
Description: 'how to initiate database in indexeddb using jsstore'
---

For initiating database you need to perform two steps -

1. Create database schema

2. Call `initDb` api supplying database schema

<br>
### Example :-

```
// initiate jsstore connection
var connection = new JsStore.Connection();

// step1 - create database schema
var tblProduct = {
    name: 'Product',
    columns: {
        // Here "Id" is name of column
        Id:{ primaryKey: true, autoIncrement: true },
        ItemName:  { notNull: true, dataType: "string" },
        Price:  { notNull: true, dataType: "number" },
        Quantity : { notNull: true, dataType: "number" }
    }
};

var tblOrder = {
    name: 'Order',
    columns: {
        // Here "OrderId" is name of column
        OrderId:{ primaryKey: true, autoIncrement: true }
    }
};

var db = {
      name: dbName,
      tables: [tblProduct, tblOrder]
}

// step 2
var isDbCreated = await connection.initDb(db);
// isDbCreated will be true when database will be initiated for first time
// and false after that.

```

If you are not able to understand, please have a look at [examples](https://github.com/ujjwalguptaofficial/JsStore/tree/master/examples) provided by jsstore.

<p class="margin-top-40px center-align">
    <button class="btn info btnNext">Next</button>
</p>
