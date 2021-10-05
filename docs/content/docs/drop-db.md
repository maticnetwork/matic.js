---
Title: 'Drop Database'
Keywords: 'drop, database, remove, indexeddb, jsstore'
Description: 'deleting database from indexeddb'
---

dropDb is used to remove the current database from browser storage.

```
connection.dropDb().then(function() {
    console.log('Db deleted successfully');
}).catch(function(error) {
    console.log(error);
});;
```

<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=dropDb()%3B">Example</a>
    <button class="btn info btnNext">Next</button>
</p>
