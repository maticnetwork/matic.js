---
Title: 'DataBase'
Keywords: 'database, api, query, indexeddb, jsstore'
Description: 'Database in JsStore is an object which contains name of database and list of tables.'
---

Database in JsStore is an object which contains name of database and list of tables.

### Syntax :-

```
var database = {
    name: "database name",
    tables: [table1, table2, table3]
}
```

### Example :-

```
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
```

Please read [initiate database](/tutorial/initiate-database) doc for knowing how to use database schema.

<p class="margin-top-40px center-align">
      <button class="btn info btnNext">Next</button>
</p>
