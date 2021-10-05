---
Title: 'Column'
Keywords: 'column, api, query, indexeddb, jsstore'
Description: 'column in jsstore is an object where column name is key & column options are values.'
---

Column in jsstore is an object where column name is key & column options are values.

```
var columns = {
    [column name]: {}
}
```

Let's see an example -

```
var columns = {
    Id:{ primaryKey: true, autoIncrement: true },
    ItemName:  { notNull: true, dataType: "string" },
    Price:  { notNull: true, dataType: "number" },
    Quantity : { notNull: true, dataType: "number" }
}
```

A column has following properties -

- primaryKey: boolean, // declare this column as primary key (optional)

- notNull: boolean, // ensure this column value should not be null (optional)

- dataType: JsStore.DATA_TYPE, // datatype of this column (optional)

For more info about data type, see this link - [DataType](/tutorial/data-type/)

- autoIncrement: boolean, // automatically increment value (optional)

- unique: boolean // This column will have unique value (optional)

- default: any, // Provides a default value for a column when none is specified (optional)

- <a href="/tutorial/multi-entry">multiEntry</a>: boolean, // Provides support to search inside array values (optional)

- enableSearch: boolean - default value is true // Turn on/off search for this column (optional)

- <a href="/tutorial/keypath/">keyPath</a> : string[] - allows you to use multiple indexing // optional
