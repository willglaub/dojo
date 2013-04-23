/*
 Copyright 2013 Daniel Wirtz <dcode@dcode.io>

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * @license dojo (c) 2013 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/dojo for details
 */
module.exports = (function() {
    
    // core
    var path = require("path"),
        fs = require("fs"),
        
    // dojo
        common = require(path.join(__dirname, 'common.js'));

    /**
     * compound namespace.
     * @type {Object.<string,*>}
     */
    var compound = {};

    /**
     * Pattern matching valid module names
     * @type {RegExp}
     * @private
     */
    var modulePattern = /^(?:doco|dojo\-\w+)$/;
    
    // NOTE: Naming convention is that all names of dojo modules except 'doco' are prefixed with 'dojo-' and contain
    // their main script in the root without the prefix, except `doco` which just is `doco.js`. The following functions
    // make use of only this.
    
    /**
     * Asynchronously gets the package information of all contained modules
     * @param {function(Error, Object.<string,*>)} callback Callback receiving an hash containing the module directories
     *  as keys and the package.json contents as values. The error parameter is set only if the directory operation
     *  failed. If a module fails, it is excluded.
     * @expose
     */
    compound.modules = function(callback) {
        fs.readdir(__dirname, function(err, files) {
            if (err) {
                callback(err, null);
                return;
            }
            var total = files.length, done = 0, all = {};
            files.forEach(function(file) {
                if (modulePattern.test(file)) {
                    fs.stat(path.join(__dirname, file), function(err, stats) {
                        if (err || !stats.isDirectory()) {
                            done++;
                            maybeReturn();
                            return;
                        }
                        try {
                            all[file] = require(path.join(__dirname, file, 'package.json'));
                        } catch (e) {}
                        done++;
                        maybeReturn();
                    });
                } else {
                    done++;
                    maybeReturn();
                }
            });
            function maybeReturn() {
                if (total == done) {
                    callback(null, all);
                }
            }
        });
    };
    
    /**
     * Synchronously gets the package information of all contained modules.
     * @returns {!Object.<string,*>} Hash containing the module directories as keys and the package.json contents as
     *  values.
     * @throws {Error} If the directory operation failed. If a module fails, it is excluded.
     * @expose
     */
    compound.modulesSync = function() {
        var files = fs.readdirSync(__dirname);
        var all = {};
        files.forEach(function(file) {
            if (modulePattern.test(file)) {
                try {
                    var stats = fs.statSync(path.join(__dirname, file));
                    if (stats.isDirectory()) {
                        all[file] = require(path.join(__dirname, file, 'package.json'));
                    }
                } catch (e) {}
            }
        });
        return all;
    };

    /**
     * Gets the package information of a contained module.
     * @param {string} moduleName Name of the module. May be "dojo-" prefixed or not.
     * @returns {*}
     * @throws {Error} If the package information could not be required
     */
    compound.module = function(moduleName) {
        if (!modulePattern.test(moduleName)) {
            moduleName = 'dojo-'+moduleName;
        }
        return require(path.join(__dirname, moduleName, 'package.json'));
    };

    /**
     * Requires a contained module.
     * @param {string} moduleName Name of the module. May be "dojo-" prefixed or not.
     * @returns {*}
     * @throws {Error} If the module could not be required
     * @expose
     */
    compound.require = function(moduleName) {
        if (!modulePattern.test(moduleName)) {
            moduleName = 'dojo-'+moduleName;
        }
        return require(path.join(__dirname, moduleName, moduleName.replace(/^dojo\-/, '')+'.js'));
    };
    
    return compound;
    
})();
