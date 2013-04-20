doco
----
The JavaScript documentation generator used in dojo. Totally technical, yet unstable but working. Contributors welcome!

Usage
-----
`npm install doco`

#### JSON (default)
`doco < sourcefile.js > docs.json`

Emits raw parser results.

#### Markdown
`doco -gen=markdown < sourcefile.js > DOCS.md`

Generates GitHub-flavoured markdown with a TOC.

#### HTML
`doco -gen=html < sourcefile.js > docs.html`

Generates only the actual HTML portion of the docs from markdown, no html or head tags. So, chain it to include your own
headers and footers to apply your own stylings, e.g.:

`cat header.html > docs.html && doco -gen=html < sourcefile.js >> docs.html && cat footer.html >> docs.html`

#### Creating custom generators
Take a look at the generators available in the `gen/` directory. It's pretty straight forward.

API (generated with doco)
-------------------------
```javascript
var doco = require("doco");
...
```

