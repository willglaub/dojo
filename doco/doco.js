// core
var path = require("path");

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

/** @expose */
module.exports = doco;
