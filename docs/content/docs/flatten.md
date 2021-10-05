---
Title: 'Flatten'
Keywords: 'flatten, select, multientry, indexeddb, jsstore'
Description: 'flatten flats array data into primitive data'
---

###### Available after v - 3.11.3

<br>
flatten is a option in select query which will flatten array data into primitive data.

e.g - Consider your data stored is :-

```
{
    name:"ujjwal gupta",
    hobbies:["travelling", "motorcycling"]
}
```

In the above example - hobbies column is array.

After flattening data will become

```
[
    {
        name:"ujjwal gupta",
        hobbies:"travelling"
    },
    {
        name:"ujjwal gupta",
        hobbies: "motorcycling"
    }
]
```

## Query

```
select({
    from:"Members",
    flatten:true
})
```

flatten is useful when you are doing join. Check this issue - [https://github.com/ujjwalguptaofficial/JsStore/issues/188](https://github.com/ujjwalguptaofficial/JsStore/issues/188)

<p class="margin-top-40px center-align">
    <button class="btn info btnNext">Next</button>
</p>
