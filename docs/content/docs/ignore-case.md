---
Title: 'Ignore Case - (deprecated)'
Keywords: 'case sensitive, ignore case, query, indexeddb, jsstore'
Description: 'select data from indexeddb with case insensitivity'
---

<div class="highlight">
Ignore case is removed from v - 3.10.0. It is recommended to use regex instead.
</div>
<br>

JavasScript is case sensitive, so is the IndexedDB. You can use option - 'IgnoreCase' to filter records with case insensitive.

```
connection.select({
    from: "Table_Name",
    ignoreCase: true,
    where: {
        Column1: some_value,
        Column2: some_another_value
    }
}).then(function(results) {
    //results will be array of objects.
    console.log(results);
}).catch(function(error) {
    alert(error.message);
});
```

<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20%22Customers%22%2C%0A%20%20%20%20ignoreCase%3Atrue%2C%0A%20%20%20%20where%3A%7B%0A%20%20%20%20%20%20%20%20country%3A'mexico'%0A%20%20%20%20%7D%0A%7D)%3B%0A">Example</a>
    <button class="btn info btnNext">Next</button>
</p>
