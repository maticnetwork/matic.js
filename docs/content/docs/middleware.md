---
Title: 'Middleware'
Keywords: 'middleware, plugin, indexeddb, jsstore'
Description: 'Middleware can be used to modify queries'
---

<div class="highlight">
Middleware is a function which has access to request and next callback and are called for each request in the same order as defined.
</div>
<br>

Middleware can be used to listen to each query and modify if necessary.

e.g - Let's say i want to encode my data when being inserted to make sure its not readable or for security purpose.

## Create Middleware

```
var connection = new JsStore.Connection();
connection.addMiddleware(function (request, next) {
    // request.name is name of api

    if(request.name=='insert'){
        // request.query is query supplied in each api

        encodeData(request.query)
    }

    // next is required to call to handle control to next middleware

    next();
});
```

now middleware is registered and can be used. Let's call a insert api

```
connection.insert({
    into:"my_secure_table"
    values:[{
        password:'12345'
    }],
    // some extra information can be provided
    encryption:'md5'
})
```

Middleware can be also created and provided as package using [plugin](/tutorial/plugin).

<p class="margin-top-40px center-align">
    <button class="btn info btnNext">Next</button>
</p>
