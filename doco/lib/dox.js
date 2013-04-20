/*
 Copyright (c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 Copyright (c) 2013 Daniel Wirtz <dcode@dcode.io>

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the 'Software'), to
 deal in the Software without restriction, including without limitation the
 rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 sell copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

// dcode: This is a cored version of dox that has been modified to play nice with code written
// for Closure Compiler. No options, no @api tag (use @expose / @private instead).

/**
 * Escapes a string of html.
 * @param {string} html
 * @returns {string}
 * @private
 */
function escape(html){
    return String(html)
        .replace(/&(?!\w+;)/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

/**
 * Trims a string.
 * @param {string} str
 * @returns {string}
 */
function trim(str) {
    return str.replace(/^[ ]+|[ ]+$/, "");
}

/**
 * Parse comments in the given string of `js`.
 * @param {string} js
 * @returns {Array}
 * @see exports.parseComment
 * @expose
 */
exports.parseComments = function(js){
    js = js.replace(/\r\n/gm, '\n');

    var comments = [],
        comment,
        buf = '',
        ignore = false,
        withinMultiline = false,
        withinSingle = false,
        code;

    for (var i = 0, len = js.length; i < len; ++i) {
        // start comment
        if (!withinMultiline && !withinSingle && '/' == js[i] && '*' == js[i+1]) {
            // code following previous comment
            if (buf.trim().length) {
                comment = comments[comments.length - 1];
                if(comment) {
                    comment.code = code = buf.trim();
                    comment.ctx = exports.parseCodeContext(code);
                }
                buf = '';
            }
            i += 2;
            withinMultiline = true;
            ignore = '!' == js[i];
            // end comment
        } else if (withinMultiline && !withinSingle && '*' == js[i] && '/' == js[i+1]) {
            i += 2;
            buf = buf.replace(/^[ \t]*\* ?/gm, '');
            comment = exports.parseComment(buf);
            comment.ignore = ignore;
            comments.push(comment);
            withinMultiline = ignore = false;
            buf = '';
        } else if (!withinSingle && !withinMultiline && '/' == js[i] && '/' == js[i+1]) {
            withinSingle = true;
            buf += js[i];
        } else if (withinSingle && !withinMultiline && '\n' == js[i]) {
            withinSingle = false;
            buf += js[i];
            // buffer comment or code
        } else {
            buf += js[i];
        }
    }

    if (comments.length === 0) {
        comments.push({
            tags: [],
            description: {full: '', summary: '', body: ''},
            isPrivate: false
        });
    }

    // trailing code
    if (buf.trim().length) {
        comment = comments[comments.length - 1];
        code = buf.trim();
        comment.code = code;
        comment.ctx = exports.parseCodeContext(code);
    }

    return comments;
};

/**
 * Parses the given comment `str`.
 *
 * The comment object returned contains the following
 *
 *  - `tags`  array of tag objects
 *  - `description` the first line of the comment
 *  - `body` lines following the description
 *  - `content` both the description and the body
 *  - `isPrivate` true when "@private" is used
 *
 * @param {String} str
 * @return {{tags: Array, description: { full: string, summary: string, body: string }, body: string, isPrivate: boolean }}
 * @see exports.parseTag
 * @expose
 */
exports.parseComment = function(str) {
    str = str.trim();

    var comment = { tags: [] }
        , description = {};

    // parse comment body
    description.full = str.split('\n@')[0];
    description.summary = description.full.split('\n\n')[0];
    description.body = description.full.split('\n\n').slice(1).join('\n\n');
    comment.description = description;

    // parse tags
    if (~str.indexOf('\n@')) {
        var tags = '@' + str.split('\n@').slice(1).join('\n@');
        comment.tags = tags.split('\n').map(exports.parseTag);
        comment.isPrivate = comment.tags.some(function(tag){
            return tag.visibility == 'private';
        })
    }

    return comment;
};

/**
 * Parsees a tag string.
 * @param {string} str
 * @returns {Object.<string.*>}
 * @expose
 */
exports.parseTag = function(str) {
    var tag = {};
    
    var off = str.indexOf(" ");
    if (off > 0) {
        tag.type = trim(str.substring(0, off));
        str = trim(str.substring(off+1));
    } else {
        tag.type = trim(str);
        str = "";
    }
    if (tag.type.length == 0 || tag.type == '@') {
        tag.type = "unnamed";
    } else if (tag.type.charAt(0) == '@') {
        tag.type = tag.type.substring(1);
    }
    
    var res;
    switch (tag.type) {
        case 'class':
            tag.description = str;
            break;
        case 'function':
            break;            
        case 'param':
            if (str.charAt(0) == '{') {
                res = exports.parseTagTypes(str);
                tag.types = res.types;
                tag.optional = res.optional;
                str = trim(res.str);
            }
            off = str.indexOf(" ");
            if (off > 0) {
                tag.name = str.substring(0, off);
                tag.description = trim(str.substring(off+1));
            } else {
                tag.name = str;
                tag.description = '';
            }
            break;
        case 'return':
            tag.type = 'returns';
            // fallthrough
        case 'returns':
            if (str.charAt(0) == '{') {
                res = exports.parseTagTypes(str);
                tag.types = res.types;
                str = trim(res.str);
            }
            tag.description = str;
            break;
        case 'see':
            if (/^https?:/.test(str)) {
                tag.url = str;
            } else {
                tag.local = str;
            }
            break;
        case 'private':
            tag.visibility = 'private';
            break;
        case 'expose':
            tag.visibility = 'public';
            break;
        case 'type':
            res = exports.parseTagTypes(str);
            tag.types = res.types;
            break;
        case 'extends':
        case 'augments':
            tag.otherClass = str;
            break;
        case 'throws':
            res = exports.parseTagTypes(str);
            tag.types = res.types;
            tag.description = res.str;
            break;
        default:
            tag.unknown = true;
            
        // there is no @memberOf or @borrows
    }
    return tag;
};

/**
 * Parses a tag type string "{Array|Object}" etc.
 * @param {string} str
 * @returns {{ types: Array, str: string }}
 * @expose
 */
exports.parseTagTypes = function(str) {
    var types = [], optional = false;
    
    // dcode: What we got here is a string starting with "{", e.g. "{(string|!{ a: string, b: function(string):boolean })=} rest"
    // The only special case here is {(...)=}
    
    var offset = str.indexOf("=}");
    if (offset > 0) {
        optional = true;
        str = str.substring(0, offset) + str.substring(offset+1);
    }
    
    // To parse this into an array, we must only split the top level declarations

    /**
     * Processes a single type.
     * @param {string} type
     * @param {number} innerLevel
     * @return {string}
     * @private
     */
    function process(type, innerLevel) {
        type = type.replace(/^\{|\}$/g, "");
        while (type.charAt(0) == '(' && type.charAt(type.length-1) == ')') { // keep "function(...)" intact
            type = type.substring(1, type.length-1);
        }
        
        return type;
    }
    
    offset = 0;
    var level = 0, innerLevel = 0, types = [];
    for (var i=0; i<str.length; i++) {
        var token = str.charAt(i);
        if (token == '{') {
            level++;
        } else if (token == '}') {
            level--;
            if (level == 0) { // We are done
                types.push(process(str.substring(offset, offset = i+1), innerLevel));
                return {
                    'types': types,
                    'optional': optional,
                    'str': trim(str.substring(i+1))
                };
            }
        } else if (token == '(' || token == '<') {
            innerLevel++;
        } else if (token == ')' || token == '>') {
            innerLevel--;
        } else if (token == '|' && level == 1) {
            types.push(process(str.substring(offset, i), innerLevel));
            offset = i+1;
        }
    }
    // If we are here, we got no valid closing tag. That's sad, so we only return what we actually know for sure.
    return {
        'types': types,
        'optional': optional,
        'str': ''
    };
};

/**
 * Parse the context from the given `str` of js.
 *
 * This method attempts to discover the context
 * for the comment based on it's code. Currently
 * supports:
 *
 *   - function statements
 *   - function expressions
 *   - prototype methods
 *   - prototype properties
 *   - methods
 *   - properties
 *   - declarations
 *
 * @param {string} str
 * @returns {Object.<string.*>}
 * @expose
 */
exports.parseCodeContext = function(str){
    var str = str.split('\n')[0];

    // function statement
    if (/^function (\w+) *\(/.exec(str)) {
        return {
            type: 'function'
            , name: RegExp.$1
            , string: RegExp.$1 + '()'
        };
        // function expression
    } else if (/^var *(\w+)[ \t]*=[ \t]*function/.exec(str)) {
        return {
            type: 'function'
            , name: RegExp.$1
            , string: RegExp.$1 + '()'
        };
        // prototype method
    } else if (/^(\w+)\.prototype\.(\w+)[ \t]*=[ \t]*function/.exec(str)) {
        return {
            type: 'method'
            , constructor: RegExp.$1
            , cons: RegExp.$1
            , name: RegExp.$2
            , string: RegExp.$1 + '.prototype.' + RegExp.$2 + '()'
        };
        // prototype property
    } else if (/^(\w+)\.prototype\.(\w+)[ \t]*=[ \t]*([^\n;]+)/.exec(str)) {
        return {
            type: 'property'
            , constructor: RegExp.$1
            , cons: RegExp.$1
            , name: RegExp.$2
            , value: RegExp.$3
            , string: RegExp.$1 + '.prototype.' + RegExp.$2
        };
        // method
    } else if (/^([\w.]+)\.(\w+)[ \t]*=[ \t]*function/.exec(str)) {
        return {
            type: 'method'
            , receiver: RegExp.$1
            , name: RegExp.$2
            , string: RegExp.$1 + '.' + RegExp.$2 + '()'
        };
        // property
    } else if (/^(\w+)\.(\w+)[ \t]*=[ \t]*([^\n;]+)/.exec(str)) {
        return {
            type: 'property'
            , receiver: RegExp.$1
            , name: RegExp.$2
            , value: RegExp.$3
            , string: RegExp.$1 + '.' + RegExp.$2
        };
        // declaration
    } else if (/^var +(\w+)[ \t]*=[ \t]*([^\n;]+)/.exec(str)) {
        return {
            type: 'declaration'
            , name: RegExp.$1
            , value: RegExp.$2
            , string: RegExp.$1
        };
    }
};
