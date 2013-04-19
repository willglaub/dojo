var path = require("path"),
    Test = require(path.join(__dirname, '..', 'test.js'));

Test.run(require(path.join(__dirname, 'suite.js')));
