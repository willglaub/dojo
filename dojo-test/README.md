<img src="https://raw.github.com/dcodeIO/dojo/master/dojo-small.png" alt="dojo" /><sup>-test</sup>
---------
Test à la [dojo](https://github.com/dcodeIO/dojo), the node.js application server. Prints nothing else than the
information you actually need and does nothing more than wrapping node's assert module.

* Syntax inspired by [nodeunit](https://npmjs.org/package/nodeunit)
* No fancy crap, just testing
* Non-utf8 and Windows terminal approved
* Allows asynchronous testing
* Allows modular tests by just assembling data structures
* API and Cli (just `test`, or `aladojo` if you are feeling culinarily)
* Small footprint, minimal dependencies

<p align="center">
    <img src="https://raw.github.com/dcodeIO/dojo/master/dojo-test/preview.jpg" alt="test à la dojo" />
</p>

Recommended usage
-----------------
Place your test suite in `tests/suite.js`.

```javascript
// package.json
...
{
    "devDependencies": {
        "dojo-test": "latest"
    },
    "scripts": {
        "test": "aladojo"
    }
}
...
```

`npm test`

Alternative usage (API)
-----------------------

```javascript
// tests/run.js
var path = require("path"),
    Suite = require("dojo-test");

Suite.run({
    "firsttest": function(test) {
        ...
        test.done();
    },
    ...
});
```

```javascript
// package.json
...
{
    "scripts": {
        "test": "node tests/run.js"
    }
}
```

`npm test`

Self-explaining examples
------------------------
* [test run](https://github.com/dcodeIO/dojo/blob/master/dojo-test/tests/run.js)
* [test suite](https://github.com/dcodeIO/dojo/blob/master/dojo-test/tests/suite.js)

License
-------
Apache License, Version 2.0
