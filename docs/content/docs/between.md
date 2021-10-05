---
Title: 'Between'
Keywords: 'between, values, where, indexeddb, jsstore'
Description: 'between is used with where query to select result between two values'
---

**" \- "** symbol is used to select result between two values. The values should be numbers only.

#### Sql (Where)

```
Select * From Table_Name;
Where
Column_Name Between value1 and value2
```

#### JsStore

```
const results = await connection.select({
    from: "Table_Name",
    where: {
        Column_Name: {
            '-': {
                low: low-value,
                high: high-value
            }
        },
    }
});

//results will be array of objects.
console.log(results);
```

<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20%22Products%22%2C%0A%20%20%20%20where%3A%20%7B%0A%20%20%20%20%20%20%20%20price%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22-%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20low%3A%2010%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20high%3A%2020%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%7D)">Example</a>
    <button class="btn info btnNext">Next</button>
</p>
