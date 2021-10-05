---
Title: 'Migrating from v2 to v3'
Keywords: 'migrate, v2, v3, indexeddb, jsstore'
Description: 'migrating from v2 to v3'
---

Migrating from V2 to V3 is very easy - You just need to change the db schema as per v3.

e.g - schema of v2 looks like this

```
function getDbSchema() {
  var tblProduct = {
    name: 'Product',
    columns: [
        {
            name: 'Id',
            primaryKey: true,
            autoIncrement: true
        },
        {
            name: 'ItemName',
            notNull: true,
            dataType: JsStore.DATA_TYPE.String
        },
        {
            name: 'Price',
            notNull: true,
            dataType: JsStore.DATA_TYPE.Number
        },
        {
            name: 'Quantity',
            notNull: true,
            dataType: JsStore.DATA_TYPE.Number
        }]
    };
    var db = {
      name: dbName,
      tables:[tblProduct]
    };
    return db;
}
```

now we need to convert the schema as per v3

```
function getDbSchema() {
  var tblProduct = {
    name: 'Product',
    columns:  {
        Id:{ primaryKey: true, autoIncrement: true },
        ItemName:  { notNull: true, dataType: "string" },
        Price:  { notNull: true, dataType: "number" },
        Quantity : { notNull: true, dataType: "number" }
    }
    var db = {
      name: dbName,
      tables:[tblProduct]
    };
    return db;
}
```

Another step is to change api `createDb` to `initDb` because in v3 createDb has been changed to initDb.

For more help, you can take a look at our [examples](https://github.com/ujjwalguptaofficial/JsStore/tree/master/examples) which has been updated as per latest version.

That's all you need to do & everything should work as normal. If you have any problem ask in our gitter group.
