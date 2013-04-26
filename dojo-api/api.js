/*
 Copyright 2013 The dojo authors (http://www.dojojs.org)

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
 * @license dojo-api (c) 2013 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: http://www.dojojs.org for details
 */
module.exports = (function() {

    // core
    var path = require("path"),
        url = require("url"),
        querystring = require("querystring"),
        http = require("http"),
        https = require("https"),

    // dojo
        pkg = require(path.join(__dirname, 'package.json')),
        common = require(path.join(__dirname, 'common.js')),

    // dojo common
        bcrypt = common.bcrypt;

    /**
     * dojo-api namespace and client.
     * @class Simple API wrapper for dojo, the node.js application server.
     * @param {string} connectUrl URL to connect to
     * @constructor
     */
    function Api(connectUrl) {
        if (!(this instanceof Api)) {
            return new Api(connectUrl);
        }
        if (!/^[\w]+:\/\//.test(connectUrl)) {
            url = "http://"+connectUrl;
        }
        if (connectUrl.charAt(connectUrl.length-1) == '/') {
            connectUrl = connectUrl.substring(0, connectUrl.length-1);
        }
        var urlp = url.parse(connectUrl);
        
        /**
         * Protocol used, e.g. "http:".
         * @type {string}
         * @expose
         **/
        this.protocol = urlp['protocol'];
        
        /**
         * Hostname to connect to.
         * @type {string}
         * @expose
         */
        this.hostname = urlp['hostname'];

        /**
         * Port to connect to. Defaults to 80 for http or 443 for https.
         * @type {number}
         * @expose
         */
        this.port = urlp['port'] ? parseInt(urlp['port'], 10) : (this.protocol == 'https:' ? 443 : 80);

        /**
         * Login name.
         * @type {?string}
         * @expose
         */
        this.name = null;

        /**
         * Session token.
         * @type {?string}
         * @expose
         */
        this.token = null;
    }

    /**
     * Packge information.
     * @type {!Object.<string,*>}
     * @expose
     */
    Api.pkg = pkg;

    /**
     * dojo-common namespace.
     * @type {!Object.<string,*>}
     * @expose
     */
    Api.common = common;

    /**
     * dojo-bcrypt namespace.
     * @type {!Object.<string,*>}
     * @expose
     */
    Api.bcrypt = common.bcrypt;

    /**
     * Calls the API.
     * @param {string} method HTTP method
     * @param {string} path Relative path
     * @param {Object} data Request data
     * @param {function(Error, *)=} callback
     * @expose
     */
    Api.prototype.call = function(method, path, data, callback) {
        if (method == 'get' || method == 'delete') {
            if (data && Object.keys(data).length > 0) {
                path += querystring.stringify(data);
            }
            data = null;
        }
        var body = JSON.stringify(data);
        var req = (this.protocol == 'https:' ? https : http).request({
            'method': method,
            'path': path,
            'hostname': this.hostname,
            'port': this.port,
            'headers': {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body),
                'User-Agent': pkg['name']+' '+pkg['version']
            },
            'auth': this.token !== null ? this.name+':'+this.token : null
        }, function(res) {
            var body = '', err = null;
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('error', function(e) {
                err = e;
                callback(err, null);
            });
            res.on('end', function() {
                if (err === null) {
                    if (res.statusCode != 200) {
                        err = new Error(res.statusCode+' '+http.STATUS_CODES[res.statusCode]);
                    }
                    callback(err, body.length > 0 ? JSON.parse(body) : {});
                }
            });
        });
        req.on('error', function(err) {
            callback(err, null);
        });
        req.write(body);
        req.end();
    };

    /**
     * Performs a GET request.
     * @param {string} path Relative path
     * @param {Object.<string,*>|function(Error, *)} params Parameters
     * @param {function(Error, *)=} callback
     * @expose
     */
    Api.prototype.get = function(path, params, callback) {
        if (typeof params == 'function') {
            callback = params;
            params = null;
        }
        this.call('get', path, params, callback);
    };

    /**
     * Performs a GET request.
     * @param {string} path Relative path
     * @param {Object.<string,*>|function(Error, *)} params Parameters
     * @param {function(Error, *)=} callback
     * @expose
     */
    Api.prototype.del = function(path, params, callback) {
        if (typeof params == 'function') {
            callback = params;
            params = null;
        }
        this.call('delete', path, params, callback);
    };

    /**
     * Performs a POST request.
     * @param {string} path Relative path
     * @param {!Object} data Data
     * @param {function(Error, *)=} callback
     * @expose
     */
    Api.prototype.post = function(path, data, callback) {
        this.call('post', path, data, callback);
    };

    /**
     * Performs a PUT request.
     * @param {string} path Relative path
     * @param {!Object} data Data
     * @param {function(Error, *)=} callback
     * @expose
     */
    Api.prototype.put = function(path, data, callback) {
        this.call('put', path, data, callback);
    };

    /**
     * Logs in using the specified credentials.
     * @param {string} name Name
     * @param {string} password Password
     * @param {!function(Error, *)} callback
     * @expose
     */
    Api.prototype.login = function(name, password, callback) {
        this.name = name;
        this.post("/login", { "name": this.name }, function(err, res) {
            if (err) {
                callback(err, null);
                return;
            }
            if (!res['challenge']) {
                callback(new Error("No challenge received from server"), null);
                return;
            }
            bcrypt.hash(password, res["challenge"], function(err, hash) {
                if (err) {
                    callback(err, null);
                    return;
                }
                var response = hash;
                bcrypt.genSalt(function(err, salt) {
                    if (err) {
                        callback(err, null);
                        return;
                    }
                    bcrypt.hash(password, salt, function(err, hash) {
                        if (err) {
                            callback(err, null);
                            return;
                        }
                        this.post("/login", { 'name': this.name, 'response': response, 'update': hash }, function(err, res) {
                            if (err) {
                                callback(err, res);
                                return;
                            }
                            if (!res['token']) {
                                callback(new Error("Missing API token"), res);
                                return;
                            }
                            this.token = res['token'];
                            callback(null, res);
                        }.bind(this));
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        }.bind(this));
    };

    /**
     * Changes the login password.
     * @param {string} password Password to set
     * @param {?string|function(Error, *)} name The name parameter is available to administrators only
     * @param {function(Error, *)=} callback
     * @expose
     */
    Api.prototype.password = function(password, name, callback) {
        if (typeof name == 'function') {
            callback = name;
            name = null;
        }
        password = bcrypt.hashSync(password, bcrypt.genSaltSync());
        this.post("/password", { 'name': name ? name : this.name, 'password': password }, callback);
    };

    /**
     * Lists all apps.
     * @param {?string|function(Error, *)} name The name parameter is available to administrators only
     * @param {function(Error, *)=} callback
     * @expose
     */
    Api.prototype.list = function(name, callback) {
        if (typeof name == 'function') {
            callback = name;
            name = null;
        }
        if (!name) {
            if (!this.name) {
                process.nextTick(callback.bind(this, new Error("Missing 'name'"), null));
                return;
            }
            name = this.name;
        }
        this.get("/apps/"+name, {}, callback);
    };

    /**
     * Views an app.
     * @param {string} app App name
     * @param {?string|function(Error, *)} name The name parameter is available to administrators only
     * @param {function(Error, *)=} callback
     * @expose
     */
    Api.prototype.view = function(app, name, callback) {
        if (typeof name == 'function') {
            callback = name;
            name = null;
        }
        if (!name) {
            if (!this.name) {
                process.nextTick(callback.bind(this, new Error("Missing 'name'"), null));
                return;
            }
            name = this.name;
        }
        this.get("/apps/"+name+"/"+app, {}, callback);
    };

    /**
     * Starts an app.
     * @param {string} app App name
     * @param {?string|!function(Error, *)} name  The name parameter is available to administrators only
     * @param {function(Error, *)=} callback
     * @expose
     */
    Api.prototype.start = function(app, name, callback) {
        if (typeof name == 'function') {
            callback = name;
            name = null;
        }
        if (!name) {
            if (!this.name) {
                process.nextTick(callback.bind(this, new Error("Missing 'name'"), null));
                return;
            }
            name = this.name;
        }
        this.post("/apps/"+name+"/"+app+"/start", {}, callback);
    };

    /**
     * Restarts an app.
     * @param {string} app App name
     * @param {?string|function(Error, *)} name The name parameter is available to administrators only
     * @param {function(Error, *)=} callback
     * @expose
     */
    Api.prototype.restart = function(app, name, callback) {
        if (typeof name == 'function') {
            callback = name;
            name = null;
        }
        if (!name) {
            if (!this.name) {
                process.nextTick(callback.bind(this, new Error("Missing 'name'"), null));
                return;
            }
            name = this.name;
        }
        this.post("/apps/"+name+"/"+app+"/restart", {}, callback);
    };

    /**
     * Stops an app.
     * @param {string} app App name
     * @param {?string|function(Error, *)} name The name parameter is available to administrators only
     * @param {function(Error, *)=} callback
     * @expose
     */
    Api.prototype.stop = function(app, name, callback) {
        if (typeof name == 'function') {
            callback = name;
            name = null;
        }
        if (!name) {
            if (!this.name) {
                process.nextTick(callback.bind(this, new Error("Missing 'name'"), null));
                return;
            }
            name = this.name;
        }
        this.post("/apps/"+name+"/"+app+"/stop", {}, callback);
    };

    /**
     * Deploys an app.
     * @param {!Object.<string,*>} pkg Package description
     * @param {?string|function(Error, *)} path Base directory, zip or tar.gz file to push the app to dojo. If omitted, the
     *  descriptor from the package.json will be used (e.g. pulling from git).
     * @param {function(Error, *)=} callback
     * @expose
     */
    Api.prototype.deploy = function(pkg, path, callback) {
        if (typeof path == 'function') {
            callback = path;
            path = null;
        }
        this.put("/apps/"+this.name, pkg, function(err, res) {
            if (err) {
                callback(err, null);
                return;
            }
            if (!('error' in res)) {
                if (path) { // Push-deploy
                    // this.upload("/apps/"+this.name+"/"+res['name'], path, callback);
                    callback(new Error("Not yet implemented"), null);
                } else { // Just start
                    this.post("/apps/"+this.name+"/"+res['name']+"/start", {}, callback);
                }
            } else {
                callback(new Error("Illegal package definition: "+res['error']), res);
            }
        })
    };

    /**
     * Purges an app.
     * @param {string} app App name
     * @param {?string|function(Error, *)} name The name parameter is available to administrators only
     * @param {function(Error, *)=} callback
     * @expose
     */
    Api.prototype.purge = function(app, name, callback) {
        if (typeof name == 'function') {
            callback = name;
            name = null;
        }
        if (!name) {
            if (!this.name) {
                process.nextTick(callback.bind(this, new Error("Missing 'name'"), null));
                return;
            }
            name = this.name;
        }
        this.del("/apps/"+name+"/"+app, {}, callback);
    };

    /**
     * Adds a new user. Available to administrators only.
     * @param {string} name Login name
     * @param {string} password Login password
     * @param {!function(Error, *)} callback
     * @expose
     */
    Api.prototype.addUser = function(name, password, callback) {
        password = bcrypt.hashSync(password, bcrypt.genSaltSync());
        this.put("/users", { 'name': name, 'password': password }, callback);
    };

    /**
     * Deletes a user. Available to administrators only.
     * @param {string} name Login name
     * @param {!function(Error, *)} callback
     * @expose
     */
    Api.prototype.delUser = function(name, callback) {
        this.del("/users/"+name, {}, callback);
    };

    /**
     * Suspends a user and all of its apps. Available to administrators only.
     * @param {string} name Login name
     * @param {!function(Error, *)} callback
     * @expose
     */
    Api.prototype.suspend = function(name, callback) {
        this.post("/users/"+name+"/suspend", {}, callback);
    };

    /**
     * Activates a user. Available to administrators only.
     * @param {string} name Login name
     * @param {!function(Error, *)} callback
     * @expose
     */
    Api.prototype.activate = function(name, callback) {
        this.post("/users/"+name+"/activate", {}, callback);
    };

    /**
     * Returns a string representation of this instance.
     * @returns {string}
     * @expose
     */
    Api.prototype.toString = function() {
        var u = this.protocol+"//"+(this.name !== null ? this.name+'@' : '')+this.hostname+":"+this.port;
        return "dojo-api-"+pkg.version+":"+u;
    };

    /**
     * Self reference.
     * @type {!Function}
     * @expose
     */
    Api.Client = Api;

    return Api;

})();
