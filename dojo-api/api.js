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
 * @license dojo-api (c) 2013 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/dojo for details
 */
    
// core
var path = require("path"),
    url = require("url"),
    querystring = require("querystring"),
    http = require("http"),
    
// dojo
    pkg = require(path.join(__dirname, 'package.json')),
    common = require(path.join(__dirname, 'common.js')),
    
// dojo common
    bcrypt = common.bcrypt,
    request = common.request;

/**
 * Constructs a new Client.
 * @class Simple API wrapper for dojo, the node.js application server.
 * @param {string} url URL to connect to
 * @constructor
 */
function Client(url) {
    if (!/^[\w]+:\/\//.test(url)) {
        url = "http://"+url;
    }
    if (url.charAt(url.length-1) == '/') {
        url = url.substring(0, url.length-1);
    }
    this.url = url;
    this.name = null;
    this.password = null;
    this.token = null;
}

/**
 * Calls the API.
 * @param {string} method HTTP method
 * @param {string} path Relative path
 * @param {*} data Request data
 * @param {function(Error, *)} callback
 */
Client.prototype.call = function(method, path, data, callback) {
    if (method == 'get' || method == 'delete') {
        if (Object.keys(data).length > 0) {
            path += querystring.stringify(data);
        }
        data = null;
    }
    request({
        'method': method,
        'url': this.url+path,
        'json': data,
        'auth': this.token !== null ? {
            'user': this.name,
            'password': this.token
        } : null
    }, function(err, res, body) {
        if (res.statusCode != 200 && !err) {
            err = new Error(res.statusCode+' '+http.STATUS_CODES[res.statusCode]);
        }
        callback(err, err ? null : (typeof body == 'string' ? JSON.parse(body) : body));
    });
};

/**
 * Performs a GET request.
 * @param {string} path Relative path
 * @param {(Object.<string,*>|function(Error, *))} params Parameters
 * @param {function(Error, *)=} callback
 */
Client.prototype.get = function(path, params, callback) {
    if (typeof params == 'function') {
        callback = params;
        params = null;
    }
    this.call('get', path, params, callback);
};

/**
 * Performs a GET request.
 * @param {string} path Relative path
 * @param {(Object.<string,*>|function(Error, *))} params Parameters
 * @param {function(Error, *)=} callback
 */
Client.prototype.del = function(path, params, callback) {
    if (typeof params == 'function') {
        callback = params;
        params = null;
    }
    this.call('delete', path, params, callback);
};

/**
 * Performs a POST request.
 * @param {string} path Relative path
 * @param {*} data Data
 * @param {function(Error, *)} callback
 */
Client.prototype.post = function(path, data, callback) {
    this.call('post', path, data, callback);
};

/**
 * Performs a PUT request.
 * @param {string} path Relative path
 * @param {*} data Data
 * @param {function(Error, *)} callback
 */
Client.prototype.put = function(path, data, callback) {
    this.call('put', path, data, callback);
};

/**
 * Logs in using the specified credentials.
 * @param {string} name Name
 * @param {string} password Password
 * @param callback
 */
Client.prototype.login = function(name, password, callback) {
    this.name = name;
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync());
    this.post("/login", { 'name': this.name, 'password': this.password }, function(err, res) {
        if (err) {
            callback(err, res);
        } else {
            if (res['token']) {
                this.token = res['token'];
                callback(null, res);
            } else {
                callback(new Error("Missing API token"), res);
            }
        }
    }.bind(this));
};

/**
 * Changes the login password.
 * @param {string} password Password to set
 * @param {string|function(Error, *)} name The name parameter is available to administrators only
 * @param {function(Error, *)=} callback
 */
Client.prototype.password = function(password, name, callback) {
    if (typeof name == 'function') {
        callback = name;
        name = null;
    }
    password = bcrypt.hashSync(password, bcrypt.genSaltSync());
    this.post("/password", { 'name': name ? name : this.name, 'password': password }, callback);
};

/**
 * Lists all apps.
 * @param {string|function(Error, *)} name The name parameter is available to administrators only
 * @param {function(Error, *)=} callback
 */
Client.prototype.list = function(name, callback) {
    if (typeof name == 'function') {
        callback = name;
        name = null;
    }
    if (!name) name = this.name;
    this.get("/apps/"+name, {}, callback);
};

/**
 * Views an app.
 * @param {string} app App name
 * @param {string|function(Error, *)} name The name parameter is available to administrators only
 * @param {function(Error, *)=} callback
 */
Client.prototype.view = function(app, name, callback) {
    if (typeof name == 'function') {
        callback = name;
        name = null;
    }
    if (!name) name = this.name;
    this.get("/apps/"+name+"/"+app, {}, callback);
};

/**
 * Starts an app.
 * @param {string} app App name
 * @param {string|function(Error, *)} name  The name parameter is available to administrators only
 * @param {function(Error, *)=} callback
 */
Client.prototype.start = function(app, name, callback) {
    if (typeof name == 'function') {
        callback = name;
        name = null;
    }
    if (!name) name = this.name;
    this.post("/apps/"+name+"/"+app+"/start", {}, callback);
};

/**
 * Restarts an app.
 * @param {string} app App name
 * @param {string|function(Error, *)} name The name parameter is available to administrators only
 * @param {function(Error, *)=} callback
 */
Client.prototype.restart = function(app, name, callback) {
    if (typeof name == 'function') {
        callback = name;
        name = null;
    }
    if (!name) name = this.name;
    this.post("/apps/"+name+"/"+app+"/restart", {}, callback);
};

/**
 * Stops an app.
 * @param {string} app App name
 * @param {string|function(Error, *)} name The name parameter is available to administrators only
 * @param {function(Error, *)=} callback
 */
Client.prototype.stop = function(app, name, callback) {
    if (typeof name == 'function') {
        callback = name;
        name = null;
    }
    if (!name) name = this.name;
    this.post("/apps/"+name+"/"+app+"/stop", {}, callback);
};

/**
 * Deploys an app.
 * @param {*} pkg Package description
 * @param {string|function(Error, *)} path Base directory, zip or tar.gz file to push the app to dojo. If omitted, the
 *  descriptor from the package.json will be used (e.g. pulling from git).
 * @param {function(Error, *)=} callback
 */
Client.prototype.deploy = function(pkg, path, callback) {
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
 * @param {string|function(Error, *)} name The name parameter is available to administrators only
 * @param {function(Error, *)=} callback
 */
Client.prototype.purge = function(app, name, callback) {
    if (typeof name == 'function') {
        callback = name;
        name = null;
    }
    if (!name) name = this.name;
    this.del("/apps/"+name+"/"+app, {}, callback);
};

/**
 * Adds a new user. Available to administrators only.
 * @param {string} name Login name
 * @param {string} password Login password
 * @param {function(Error, *)} callback
 */
Client.prototype.addUser = function(name, password, callback) {
    password = bcrypt.hashSync(password, bcrypt.genSaltSync());
    this.put("/users", { 'name': name, 'password': password }, callback);
};

/**
 * Deletes a user. Available to administrators only.
 * @param {string} name Login name
 * @param {function(Error, *)} callback
 */
Client.prototype.delUser = function(name, callback) {
    this.del("/users/"+name, {}, callback);
};

/**
 * Suspends a user and all of its apps. Available to administrators only.
 * @param {string} name Login name
 * @param {function(Error, *)} callback
 */
Client.prototype.suspend = function(name, callback) {
    this.post("/users/"+name+"/suspend", {}, callback);
};

/**
 * Activates a user. Available to administrators only.
 * @param {string} name Login name
 * @param {function(Error, *)} callback
 */
Client.prototype.activate = function(name, callback) {
    this.post("/users/"+name+"/activate", {}, callback);
};

/**
 * Returns a string representation of this instance.
 * @returns {string}
 */
Client.prototype.toString = function() {
    var u = url.parse(this.url);
    if (this.name !== null) {
        u['auth'] = this.name;
    }
    return "dojo-api-"+pkg.version+":"+url.format(u);
};

module.exports = Client;
