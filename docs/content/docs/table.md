---
Title: 'Table'
Keywords: 'table, api, query, indexeddb, jsstore'
Description: 'learn how to create table in indexedb using jsstore'
---

Table in JsStore is an object which contains name of table & columns schema.

### Syntax :-

```
var table1 = {
    name: "table_name",
    columns: {
        column1: { dataType: 'datatype', primaryKey: true },
        column2 : { dataType: 'datatype'},
        ..... ,
        columnN: { dataType: 'datatype' }
    }
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
```

**Note :-** It is mandatory to have a column with a primary key for every table. A primary key is used to uniquely identify a record or data row.

For more information about column - please check [column](/tutorial/column) doc.

<p class="margin-top-40px center-align">
    <button class="btn info btnNext">Next</button>
</p>
