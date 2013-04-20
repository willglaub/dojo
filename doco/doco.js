// core
var path = require("path"),
    fs = require("fs");

/**
 * doco namespace.
 * @type {Object.<string, *>}
 */
var doco = {};

/**
 * Bundled / modified dox.
 * @type {dox}
 * @expose
 */
doco.dox = require(path.join(__dirname, "lib", "dox.js"));

/**
 * Bundled / modified marked.
 * @type {marked}
 * @expose
 */
doco.marked = require(path.join(__dirname, "lib", "marked.js"));

/**
 * Available generators inside the `gen/` folder.
 * @type {Object.<string, function(Array):string>}
 * @expose
 */
doco.gen = {};

// Expose all generators
var files = fs.readdirSync(path.join(__dirname, 'gen'));
files.forEach(function(file) {
    if (/\.js$/.test(file)) {
        try {
            doco.gen[file.replace(/\.js$/, '')] = require(path.join(__dirname, 'gen', file));
        } catch (e) {
            console.log(e);
        }
    }
});

/**
 * Parses a source and returns the generated doco.
 * @param {string} source Source contents
 * @param {(string|function(Array):string)=} gen Generator to use. May be the name of a generator or a generator function.
 *  Defaults to doco.gen.json.
 * @returns {string} Generated doco
 * @thorws {Error} If anything goes wrong like there is no such generator
 * @expose
 */
doco.doco = function(source, gen) {
    if (typeof gen == 'string') {
        gen = doco.gen[gen];
    }
    if (!gen) {
        gen = doco.gen['json'];
    }
    return gen(doco.dox.parseComments(source));
};

/** @expose */
module.exports = doco;
