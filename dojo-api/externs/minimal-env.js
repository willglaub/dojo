/**
 * @fileoverview Minimal environment to compile dojo-api.
 * @externs
 */

/**
 * @constructor
 * @private
 */
var Module = function() {};

/**
 * @type {*}
 */
Module.prototype.exports;

/**
 * @type {Module}
 */
var module;

/**
 * @param {string} moduleName
 * @returns {?}
 */
var require = function(moduleName) {};

/**
 * @type {Object.<string,*>}
 */
var path;

/**
 * @param {...string} var_args
 * @returns {string}
 */
path.join = function(var_args) {};

/**
 * @type {string}
 */
var __dirname;

/**
 * @type {Object.<string,*>}
 */
var process;

/**
 * @param {Function} callback
 */
process.nextTick = function(callback) {};

/**
 * @constructor
 */
var Buffer = function() {};

/**
 * @param {string} str
 * @returns {number}
 */
Buffer.byteLength = function(str) {};

/**
 * @type {Object.<string,*>}
 */
var url;

/**
 * @param {string} str
 * @returns {{protocol: ?string, port: number, hostname: ?string, path: ?string}}
 */
url.parse = function(str) {};

/**
 * @param {Object.<string,*>} obj
 * @returns {string}
 */
url.format = function(obj) {};

/**
 * @type {Object.<string,*>}
 */
var http;

/**
 * @param {!Object.<string,*>} options
 * @param {!function(http.ServerResponse)} callback
 * @returns {http.ClientRequest}
 */
http.request = function(options, callback) {};

/**
 * @constructor
 * @private
 */
http.ServerResponse = function() {};

/**
 * @param {string} evt
 * @param {!function(*=)}  callback
 */
http.ServerResponse.prototype.on = function(evt, callback) {};

/**
 * @type {number}
 */
http.ServerResponse.prototype.statusCode;

/**
 * @constructor
 * @private
 */
http.ClientRequest = function() {};

http.ClientRequest.prototype.on = http.ServerResponse.prototype.on;

/**
 * @type {Object.<number,string>}
 */
http.STATUS_CODES;

/**
 * @type {Object.<string,*>}
 */
var https;

https.request = http.request;

https.ClientRequest = http.ClientRequest;

https.ServerResponse = http.ServerResponse;
