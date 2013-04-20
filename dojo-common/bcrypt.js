var path = require("path"),
    fs = require("fs");

if (fs.existsSync(path.join(__dirname, "..", "dojo-bcrypt", "bcrypt.js"))) {
    module.exports = require(path.join(__dirname, "..", "dojo-bcrypt", "bcrypt.js"));
} else {
    module.exports = require("dojo-bcrypt");
}
