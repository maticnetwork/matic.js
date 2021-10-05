---
Title: 'Case'
Keywords: 'case, query, indexeddb, jsstore'
Description: 'case is used to change stored value based on some condition.'
---

case is an option in select query which is used to change stored value based on some condition. It is similar to multiple if else statetement. So once a condition is true it is stopped and value is returned.

```
const results = await connection.select({
    from: 'Customers',
    case: {
        city: [{
            '=': 'London',
            then: 'London UK'
        }, {
            then: 'World'
        }]
    }
})
```

You can use other operators symbol similar to '=' used above - '>', '>=, '<' ,'<=', '!='

<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20'Customers'%2C%0A%20%20%20%20case%3A%20%7B%0A%20%20%20%20%20%20%20%20city%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20'%3D'%3A%20'London'%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20then%3A%20'London%20UK'%0A%20%20%20%20%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20then%3A%20'World'%0A%20%20%20%20%20%20%20%20%7D%5D%0A%20%20%20%20%7D%0A%7D)">Example</a>
</p>

**Note : -**

- If you want to return stored value instead of custom value - provide null value in `then` - `{ then:null }`
- This is not used to filter values but to change value. To filter value `where` is used.

<div class="margin-top-30px top-border margin-bottom-20px"></div>
#### Order
<br>
case can be also used in order query to change the ordering of result.

**e.g -** In Customers table : record contains values - "Argentina", "Austria" , etc. in column "country". When sorting by coluntry in ascending order - the record "Argentina" comes first & then "Austria". But for some reason we want Austria to comes first.

In this case we will have to use `case query` in `order` & provide a value for "Austria" which is lesser than "Argentina".

```
const results = await connection.select({
    from: 'Customers',
    order: {
        by: 'country',
        case: [{
            '=': 'Austria',
            then: "a" // telling value of 'Austria is a'
        }, {
            then: null
        }]
    }
})
```

**Note :-** Use same data type as column in `then` value otherwise you might get some error. In the above example - i have provided string value "a", as country data type is string.

<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20'Customers'%2C%0A%20%20%20%20limit%3A%2010%2C%0A%20%20%20%20order%3A%20%7B%0A%20%20%20%20%20%20%20%20by%3A%20'country'%2C%0A%20%20%20%20%20%20%20%20case%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20'%3D'%3A%20'Austria'%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20then%3A%20%22a%22%0A%20%20%20%20%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20then%3A%20null%0A%20%20%20%20%20%20%20%20%7D%5D%0A%20%20%20%20%7D%0A%7D)">Example</a>
</p>

Another scenario is when you want to change order by column based on some condition.

```
select({
    from: 'Customers',
    order: {
        by: {
            'country': [{
                '=': 'Spain',
                then: "city"
            }, {
                then: 'country'
            }]
        }
    }
})
```

<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20'Customers'%2C%0A%20%20%20%20order%3A%20%7B%0A%20%20%20%20%20%20%20%20by%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20'country'%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20'%3D'%3A%20'Spain'%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20then%3A%20%22city%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20then%3A%20'country'%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%5D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%7D)">Example</a>
</p>

#### Group By

case can be used in group by for grouping values dynamically.

e.g -

```
const results = await connection.select({
    from: 'Products',
    groupBy: {
        'price': [{
            '<=': 100,
            then: 'affordable item'
        }, {
            then: 'costly item'
        }]
    }
})
```

<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20'Products'%2C%0A%20%20%20%20groupBy%3A%20%7B%0A%20%20%20%20%20%20%20%20'price'%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20'%3C%3D'%3A%20100%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20then%3A%20'affordable%20item'%0A%20%20%20%20%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20then%3A%20'costly%20item'%0A%20%20%20%20%20%20%20%20%7D%5D%0A%20%20%20%20%7D%0A%7D)">Example</a>
</p>
