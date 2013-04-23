var path = require("path"),
    fs = require("fs"),
    Suite = require(path.join(__dirname, "..", "test.js"));

// Test all
var files = fs.readdirSync(path.join(__dirname, '..'));
var all = {};
files.forEach(function(file) {
    if (/^(?:dojo\-[\w]+|doco)$/.test(file)) {
        try {
            all[file.replace(/^dojo\-/, '')] = require(path.join(__dirname, '..', file, 'tests', 'suite.js'));
        } catch (e) {}
    }
});
module.exports = all;
