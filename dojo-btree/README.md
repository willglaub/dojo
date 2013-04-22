<img src="https://raw.github.com/dcodeIO/dojo/master/dojo-small.png" alt="dojo" /><sup>-btree</sup>
==============
A ridiculously lean B-tree of variable orders in plain JavaScript.

Features
--------
* Compiled with ClosureCompiler.js using ADVANCED_OPTIMIZATIONS
* Zero vebose warnings and errors, 100% typed code
* Zero dependencies
* Type checking reduced to the absolute minimum (everything else is left to you)
* Exposes only the bare minimum to the outside world

Example
-------
`npm install dojo-btree`

```javascript
var btree = require("dojo-btree");
var Tree = btree.create(2, btree.numcmp);
var tree = new Tree();
tree.put(0, "null");
tree.put(1, "one");
tree.put(2, "two");
tree.del(1);
tree.get(2); // == "two"
...
```

Usage
-----
#### btree.create([order: number[, compare: function]]):Tree
Creates and returns a Tree class of the specified order with the specified comparator.

| Parameter | Function                                                                                                    | 
| --------- | ----------------------------------------------------------------------------------------------------------- |
| order     | Order of the Tree-class to build as a number. Defaults to `2`.                                              |
| compare   | function(a: *, b: *):number returning -1 if a&lt;b, 1 if a&gt;b and 0 otherwise. Defaults to `btree.numcmp` |

#### btree.numcmp
Numeric comparator.

#### btree.strcmp
Strict string comparator that compares strings character by character.

#### new Tree()
Constructs a Tree instance of the order specified to `btree.create` previously.

#### Tree#put(key:*, value:*):boolean
Puts a non-undefined, non-null key with the given non-undefined value into the tree. You have to type check keys on your
own.

#### Tree#get(key:*):*|undefined
Gets the value of the specified key. Returns `undefined` if the key does not exist. There is no Tree#exists method or
similar because it just would encourage multiple lookups if one is already sufficient. So the correct usage is:

```javascript
var value = tree.get(myKey);
if (typeof value == 'undefined') {
    // Key does not exist
} else {
    // Key exists, value may be null
}
```

#### Tree#del(key:*):boolean
Deletes a key from the tree. Returns `true` on success or `false` if there is no such key.

#### Tree#walk\[Asc\]([minKey: *[, maxKey: *]], callback: function):undefined
Walks the range [minKey, ..., maxKey] in ascending order by calling the callback for every key/value pair found.

| Parameter | Function                                                                                      |
| --------- | --------------------------------------------------------------------------------------------- |
| minKey    | Minimum key or `null` to start at the beginning                                               |
| maxKey    | Maximum key or `null` to walk till the end                                                    |
| callback  | function(key:*, value:*):undefined\|boolean                                                   |

To break the loop, let callback explicitly return `true`.

#### Tree#walkDesc([minKey: *[, maxKey: *]], callback: function):undefined
Walks the range [minKey, ..., maxKey] in descending order by calling the callback for every key/value pair found.

#### Tree#count([minKey: *[, maxKey: *]])
Counts the number of keys in the range [minKey, ..., maxKey]. See `Tree#walk`.

**Note**: `Tree#put`, `Tree#get` and `Tree#del` throw an `Error` only if the key is `undefined` or `null` or the value
is `undefined`. Other methods do not throw.

Benchmark
---------
The test suite contains a 100k benchmark:

<p align="center">
    <img src="https://raw.github.com/dcodeIO/dojo/master/dojo-btree/bench.jpg" alt="benchmark" />
</p>

Ran in node v0.10.3 on one core of an 3.40Ghz Intel Core i7-2600K working with premium DDR3 ram (I'm too lazy to look
up the exact model). Results include compute time of assertions for every single operation. To test on your own hardware,
simply run `npm [-g] install dojo-test` + `npm test`.

[test à la dojo](https://github.com/dcodeIO/dojo/tree/master/dojo-test) itself is an optimized wrapper around node's
native assert module.

License
-------
Apache License, Version 2.0
