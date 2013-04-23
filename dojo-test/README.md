<img src="https://raw.github.com/dcodeIO/dojo/master/dojo-small.png" alt="dojo" /><sup>-test</sup>
---------
Test à la [dojo](https://github.com/dcodeIO/dojo), the node.js application server. Prints nothing else than the
information you actually need and does nothing more than wrapping node's assert module.

* Syntax inspired by [nodeunit](https://npmjs.org/package/nodeunit)
* No fancy crap, just testing like a man
* Non-utf8 and Windows terminal approved
* Allows asynchronous testing
* Allows modular tests by just assembling data structures
* API and Cli (just `test`, or `aladojo` if you are feeling culinarily)
* Small footprint, minimal dependencies
* Available through [npm](https://npmjs.org/package/dojo-test): `npm [-g] install dojo-test`

<p align="center">
    <img src="https://raw.github.com/dcodeIO/dojo/master/dojo-test/preview.jpg" alt="test à la dojo" />
</p>

Usage
-----

#### Cli
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

#### API

```javascript
// tests/run.js
var Suite = require("dojo-test");

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

Assertions
----------
All of [node's assert](http://nodejs.org/api/assert.html) (just replace `assert` through `test`) plus `test.notOk(...)`
as a negated `ok`. There is also a `test.log(...)` for logging straight to the test console.

Self-explaining examples
------------------------
* [tests/suite.js](https://github.com/dcodeIO/dojo/blob/master/dojo-test/tests/suite.js) - test suite as a module
* [tests/run.js](https://github.com/dcodeIO/dojo/blob/master/dojo-test/tests/run.js) - runs it through the API

When typing `test` or `aladojo` in a terminal, `tests/suite.js` will be run. Also supports running runners:
`aladojo tests/run.js` or custom / other unit tests under the condition that the runner (here: `run.js`) does not export
anything. If it does, whatever it exports will be run.

Command line options
--------------------
| Option                     | Function                                 |
| -------------------------- | ---------------------------------------- |
| `--nocolors` or `-nc`      | Disables terminal colors                 |
| `--name=NAME` or `-n=NAME` | Sets the suite name, defaults to `suite` |

Example: `aladojo --name=MyGame -nc`

License
-------
Apache License, Version 2.0
