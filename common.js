var path = require("path"),
    fs = require("fs");

fs.exists(path.join(__dirname, "dojo-common", "common.js"), function(exists) {
    if (exists) {
        module.exports = require(path.join(__dirname, "dojo-common", "common.js"));
    } else {
        module.exports = require(path.join(__dirname, "node-modules", "dojo-common", "common.js"));
    }
});
