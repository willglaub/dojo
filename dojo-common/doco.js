var path = require("path"),
    fs = require("fs");

if (fs.existsSync(path.join(__dirname, "..", "doco", "doco.js"))) {
    module.exports = require(path.join(__dirname, "..", "doco", "doco.js"));
} else {
    module.exports = require("doco");
}
