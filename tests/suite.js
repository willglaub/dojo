// core
var path = require("path"),
    fs = require("fs"),
    
// dojo
    compound = require(path.join(__dirname, '..', 'compound.js')),
    Suite = require(path.join(__dirname, "..", "test.js"));

// Test the compound
module.exports['compound'] = {

    'modules': function(test) {
        compound.modules(function(err, all) {
            test.ifError(err);
            test.ok(all['dojo-common']);
            test.equal(all['dojo-common']['name'], 'dojo-common');
            test.done();
        });
    },

    'modulesSync': function(test) {
        test.doesNotThrow(function() {
            var all = compound.modulesSync();
            test.ok(all['dojo-common']);
            test.equal(all['dojo-common']['name'], 'dojo-common');
            test.done();
        });
    },

    'module': function(test) {
        test.doesNotThrow(function() {
            var commonInfo = compound.module("dojo-common");
            test.ok(commonInfo);
            test.equal(commonInfo['name'], 'dojo-common');
            test.doesNotThrow(function() {
                test.deepEqual(compound.module("common"), commonInfo);
            });
            test.done();
        });
    },

    'require': function(test) {
        test.doesNotThrow(function() {
            var common = compound.require("dojo-common");
            test.ok(common);
            test.strictEqual(typeof common.getopt, 'function');
            test.doesNotThrow(function() {
                test.strictEqual(compound.require("common"), common);
            });
            test.done();
        });
    }
};

// Test all modules
var modules = compound.modulesSync();
Object.keys(modules).forEach(function(moduleName) {
    try {
        module.exports[moduleName.replace(/^dojo\-/, '')] = require(path.join(__dirname, '..', moduleName, 'tests', 'suite.js'));
    } catch (e) {}
});
