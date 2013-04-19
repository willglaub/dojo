var path = require("path"),
    fs = require("fs");

if (fs.existsSync(path.join(__dirname, "..", "dojo-common", "common.js"))) {
    module.exports = require(path.join(__dirname, "..", "dojo-common", "common.js"));
} else {
    module.exports = require("dojo-common");
}
