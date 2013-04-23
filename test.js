var path = require("path"),
    fs = require("fs");

if (fs.existsSync(path.join(__dirname, "dojo-test", "test.js"))) {
    module.exports = require(path.join(__dirname, "dojo-test", "test.js"));
} else {
    module.exports = require("dojo-test");
}
