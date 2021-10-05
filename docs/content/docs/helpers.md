---
Title: 'Helpers'
Keywords: 'helpers, api, query, indexeddb, jsstore'
Description: 'jsstore helpers methods'
---

#### setLogStatus

It sets the status of log. When supplied true - JsStore logs query flow in console. This is helpful in debugging.

```
connection.setLogStatus(true);
```

#### getDbVersion

It returns the current Database version.

```
connection.getDbVersion(db_name).then(function(version) {
    console.log(version)
})
```

#### getDbSchema

It returns the Database Schema.

```
connection.getDbSchema(db_name).then(function(schema) {
    console.log(schema)
});
```

#### getDbList

It returns list of database created using jsstore.

```
connection.getDbList().then(function(result) {
    console.log(result)
});
```

#### set

It stores data in form of key and value in a special table. You can think of it is similar to localStorage but you can store every type of data using 'set' which is not the case with localStorage (can be stored only string).

Lets say you want to store user profile picture or may be some basic information, so that you can load it on page load.

```
var userInfo = {
    name: 'ujjwal gupta',
    accountType: 'super_admin',
    profilePic: Blob Object // i am not creating it.

}
connection.set("user_info", userInfo).then(function() {
    console.log('value setted');
});
```

#### get

Get data from special table.

```
connection.get("user_info").then(function(userInfo) {
    console.log(userInfo);
});
```
