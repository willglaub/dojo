/**
 * @fileoverview Minimal environment for dojo-test.
 * @externs
 */

/**
 * @param {string} moduleName
 * @returns {*}
 */
function require(moduleName) {}

/**
 * @type {Object.<string,*>}
 */
var path = {};

/**
 * @param {...[string]} var_args
 * @returns {string}
 */
path.join = function(var_args) {};

/**
 * @param {function()} callback
 * @param {...[*]} var_args
 */
function setImmediate(callback, var_args) {};
