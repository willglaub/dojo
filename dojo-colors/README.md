<img src="https://raw.github.com/dcodeIO/dojo/master/dojo-small.png" alt="dojo" /><sup>-colors</sup>
===========
A cored, fixed, documented and optimized version of the popular [colors.js](https://github.com/Marak/colors.js). Can be
used as a drop-in replacement, also works correctly in the browser and has been compiled through Closure Compiler using
advanced optimizations. Additionally, nearly every issue and pull request on the original has been incorporated.

<p align="center">
    <img src="https://raw.github.com/dcodeIO/dojo/master/dojo-btree/bench.jpg" alt="dojo-colors" />
</p>

Installation
------------
`npm install dojo-colors`

Usage
-----
This package extends the global String prototype with additional getters that apply terminal colors to your texts.
Available styles are:

* **Emphasis:** bold, italic, underline, inverse
* **Colors:** yellow, cyan, white, magenta, green, red, grey, blue
* **Sequencers:** rainbow, zebra, random

#### Example

``` js
var colors = require('dojo-colors');
console.log('hello'.green); // outputs green text
console.log('i like cake and pies'.underline.red) // outputs red underlined text
console.log('inverse the color'.inverse); // inverses the color
console.log('OMG Rainbows!'.rainbow); // rainbow (ignores spaces)
```

Custom themes
-------------
Its also possible to define your own themes by creating new getters on the String object. Example:

```js
var colors = require('dojo-colors');
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: ['yellow', 'underline'], // Applies two styles at once
  debug: 'blue',
  error: 'red bold' // Again, two styles
});

console.log("this is an error".error); // outputs bold red text
console.log("this is a warning".warn); // outputs underlined yellow text

console.log(colors.green("this is green")); // Alternatively
```

Console, browser and browser-css mode
-------------------------------------
```js
var colors = require('dojo-colors');
...
colors.mode = 'none'; // No colors at all
colors.mode = 'console'; // Adds terminal colors (default on node.js)
colors.mode = 'browser'; // Adds HTML colors (default in browsers)
colors.mode = 'browser-css'; // Adds special CSS (see examples/example.css)
```

Uninstalling / reinstalling on the global scope
-----------------------------------------------
If you have a reason to use a fresh String prototype in your application, you may also revert all extensions made.
```js
var colors = require('dojo-colors');
...
colors.uninstall(); // Removes all custom properties from the String prototype
...
colors.install(); // Re-installs them
...
```

Kitchensink
-----------
* AMD compatible (e.g. require.js)
* CommonJS compatible (node.js)
* Shim compatible
* Externs for Closure Compiler
* Zero dependencies

Credits
-------
Based on work started by Marak (Marak Squires), Alexis Sellier (cloudhead), mmalecki (Maciej Małecki), nicoreed (Nico
Reed), morganrallen (Morgan Allen), JustinCampbell (Justin Campbell) and ded (Dustin Diaz).

License
-------
The MIT-License (MIT)
