---
Title: 'Advanced Sql Example'
Keywords: 'advanced sql, example, indexeddb, jsstore'
Description: 'Advanced sql example with respective jsstore query'
---

These are some examples of common use cases -

- **SQL** \- Select \* from Table_Name where Column1=value1 or Column2=value2 or Column3=value3;

```
connection.select({
    from: "Table_Name",
    where: {
        Column1: value1,
        or: {
            Column2: value2,
            Column3: value3
        }
    }
});
```

- **SQL** \- Select \* from Table_Name where Column1=value1 and (Column2=value2 or Column3=value3);

```
connection.select({
    from: "Table_Name",
    where: [{
            Column1: value1
        },
        {
            Column2: value2,
            or: {
                Column3: value3
            }
        }
    ]
});
```

- **SQL** \- Select \* from Table_Name where Column1=value1 or (Column2=value2 and Column3=value3);

```
connection.select({
    from: "Table_Name",
    where: [{
            Column1: value1
        },
        {
            or: {
                Column2: value2,
                Column3: value3
            }
        }
    ]
});
```

Hope these examples will help you to write more complex queries. If you are not able to understand or write some complex queries - ask at stackoverflow mentioning jsstore and indexeddb.
