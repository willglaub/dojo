var path = require("path"),
    fs = require("fs");

if (fs.existsSync(path.join(__dirname, "..", "dojo-colors", "colors.js"))) {
    module.exports = require(path.join(__dirname, "..", "dojo-colors", "colors.js"));
} else {
    module.exports = require("dojo-colors");
}
