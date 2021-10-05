---
Title: 'Operators'
Keywords: 'operators, >, <, indexeddb, jsstore'
Description: 'list of operators available and their uses'
---

JsStore supports following operators : -

- **" &gt; " :** Finds value greater than supplied value.
- **" &lt; " :** Finds value less than supplied value.
- **" &gt;= " :** Finds value greater than or equal to supplied value.
- **" &lt;= " :** Finds value less than or equal to supplied value.
- **" \- " :** Finds value between two supplied value. Read <a href="/tutorial/between">between doc</a> for more info.
- **" != " :** Finds value not equal to supplied value.

#### Sql

```
Select * From Table_Name;
Where
Column_Name > some_value
```

#### JsStore

```
var results = await connection.select({
    from: "Table_Name",
    where: {
        Column_Name: {
            '>': some_value
        },
    }
});
//results will be array of objects.
console.log(results);
```

<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20%22Products%22%2C%0A%20%20%20%20where%3A%20%7B%0A%20%20%20%20%20%20%20%20price%3A%7B%0A%20%20%20%20%20%20%20%20%20%22%3E%22%3A20%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%7D)%3B%0A">Example</a>
    <button class="btn info btnNext">Next</button>
</p>
