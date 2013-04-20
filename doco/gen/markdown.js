module.exports = function(comments){
    var buf = [];

    comments.forEach(function(comment){
        if (comment.isPrivate || comment.ignore) return;
        var ctx = comment.ctx;
        var desc = comment.description;
        if (!ctx) return;
        if (~desc.full.indexOf('Module dependencies')) return;
        if (!ctx.string.indexOf('module.exports')) return;
        if (context(comment) == 'lr') {
            console.log(comment);
        }
        buf.push('### ' + context(comment));
        buf.push('');
        buf.push(desc.full.trim().replace(/^/gm, '  '));
        if (comment.tags && comment.tags.length > 0) {
            buf.push('');
            buf.push(paramstable(comment.tags));
        }
        buf.push('');
    });

    buf = buf
        .join('\n')
        .replace(/^[ ]+/gm, '');

    var code = buf.match(/^( {4}[^\n]+\n*)+/gm) || [];

    code.forEach(function(block){
        var code = block.replace(/^ {4}/gm, '');
        buf = buf.replace(block, '```js\n' + code.trimRight() + '\n```\n\n');
    });

    return "## doco\n\n"+toc(buf) + '\n\n' + buf;
};

function toc(str) {
    return headings(str).map(function(h){
        var clean = h.title;
        return '  - [' + clean + '](#' + slug(h.title) + ')';
    }).join('\n');
}

function slug(str) {
    return str.replace(/ /g, '-').replace(/[^\w\-]+/g, '').toLowerCase();
}

function headings(str) {
    return str.match(/^#+ *([^\n]+)/gm).map(function(str){
        str = str.replace(/^(#+) */, '');
        return {
            title: str,
            level: RegExp.$1.length
        }
    });
}

function context(comment) {
    var ctx = comment.ctx;
    var tags = comment.tags;
    switch (ctx.type) {
        case 'method':
            return (ctx.cons || ctx.receiver) + '.' + ctx.name + '(' + params(tags) + ')';
        default:
            return ctx.string;
    }
}

function params(tags) {
    return tags.filter(function(tag){
        return tag.type == 'param';
    }).map(function(param){
            return param.name+(param.optional ? '\\*': '');
        }).join(', ');
}

function paramstable(tags) {
    var params = tags.filter(function(tag) {
        return tag.type == 'param';
    });
    var returns = tags.filter(function(tag) {
        return tag.type == 'returns';
    });
    var throws = tags.filter(function(tag) {
        return tag.type == 'throws';
    });
    if (params.length == 0 && returns.length == 0 && throws.length == 0) {
        return "";
    }
    var spacer = "| | | |\n";
    var tbl = "| Name | Type | Description |\n"+
              "| ---- | ---- | ----------- |\n";
    if (params.length > 0) {
        tbl += params.map(function(param) {
            return "| "+param.name+(param.optional ? '\\*' : '')+" | "+param.types.join(" | ").replace("|", "&#166;")+" | "+param.description.replace("|", "&#166;")+" |";
        }).join('\n')+'\n';
    }
    if (returns.length > 0) {
        if (params.length > 0) {
            tbl += spacer;
        }
        tbl += returns.map(function(param) {
            return "| **returns** | "+param.types.join(" | ").replace("|", "&#166;")+" | "+param.description;
        }).join('\n')+'\n';
    }
    if (throws.length > 0) {
        if (params.length > 0 && returns.length == 0) {
            tbl += spacer;
        }
        tbl += throws.map(function(param) {
            return "| **throws** | "+param.types.join(" | ").replace("|", "&#166;")+" | "+param.description;
        }).join('\n')+'\n';
    }
    return tbl;
}