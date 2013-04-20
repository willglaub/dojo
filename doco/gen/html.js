var path = require("path"),
    markdown = require(path.join(__dirname, 'markdown.js')),
    marked = require(path.join(__dirname, '..', 'lib', 'marked.js'));

module.exports = function(comments) {
    return marked(markdown(comments));
};