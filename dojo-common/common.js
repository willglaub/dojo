// core
var path = require("path"),
    
// dojo
    pkg = require(path.join(__dirname, 'package.json'));

/**
 * dojo common namespace.
 * @type {Object.<string,*>}
 */
var common = {};

/**
 * npm: colors
 * @type {?}
 */
common.colors = require(path.join(__dirname, 'lib', 'colors.min.js'));

/**
 * npm: dojo-bcrypt
 * @type {bcrypt}
 */
common.bcrypt = require(path.join(__dirname, 'bcrypt.js'));

/**
 * npm: semver
 * @type {semver}
 */
common.semver = require(path.join(__dirname, 'lib', 'semver.min.js'));

/**
 * @type {events.EventEmitter}
 */
common.EventEmitter = require("events").EventEmitter;

/**
 * Common package.
 * @type {Object.<string,*>}
 */
common.pkg = require(path.join(__dirname, 'package.json'));

/**
 * Cli banner.
 * @type {string}
 */
common.banner = [
    '',
    '  _| _ . _ '.green.bold,
    ' (_|(_)|(_)'.green.bold+' v'+common.pkg['version']+" (c) "+common.pkg['author'],
    '       \'  '.green.bold,
    ''
].join('\n');

/**
 * Cli colored dojo.
 * @type {string}
 */
common.dojo = "dojo".green.bold;

/**
 * Cli OK.
 * @param {string=} msg
 * @param {string=} name
 */
common.ok = function(msg, name) {
    name = name || 'dojo';
    process.stderr.write('\n '+name.green.bold+' OK'.white.bold+(msg ? ' '+msg : '')+'\n');
    process.exit(0);
};

/**
 * Cli ERROR.
 * @param {string=} msg
 * @param {string=} name
 * @param {number=} value
 */
common.fail = function(msg, name, value) {
    name = name || 'dojo';
    process.stderr.write('\n '+name.red.bold+' ERROR'.white.bold+(msg ? ' '+msg : '')+'\n');
    process.exit(typeof value != 'undefined' ? value : 1);
};

/**
 * Greetings.
 * @type {Array.<string>}
 */
common.greetings = [
    'Hello $, hope you are well!',
    'Hello $, how are you?',
    'Hello $, ready for anything?',
    'Hello $, how far are you willing to go?',
    'Hello $, keep walking tall!',
    'Hello $, how\'s your jitsu evolving?',
    'Hello $, you carrying heat?',
    'Hello $, I see you are already on it. Good job!',
    'Hello $, interested in some poetry?',
    'Hello $, hope you are insured...',
    'Hello $, is it really you? Pleased to see you again!',
    'Hello $! Remember, it\'s usually not a question of fate.',
    'Hello $, solutions at 180 degrees!'
];

/**
 * Super-lightweight command line option parser.
 * @param {Array.<string>} pargv Command line options
 * @returns {{argv: Array.<string>, opt: Object.<string,boolean|string>}}
 */
common.getopt = function(pargv) {
    /** @type {Array.<string>} */
    var argv = [];
    /** @type {Object.<string,boolean|string>} */
    var opt = {};
    for (var i=2; i<pargv.length; i++) {
        var arg = pargv[i];
        if (arg.charAt(0) == '-') {
            arg = arg.replace(/^[\-]+/, '');
            var p = arg.indexOf("=");
            if (p > 0) {
                opt[arg.substring(0,p)] = arg.substring(p+1);
            } else {
                opt[arg] = true;
            }
        } else {
            argv.push(arg);
        }
    }
    return {
        'argv': argv,
        'opt': opt
    };
};

/**
 * Readline mask for sensible inputs.
 */
common.rlMask = function(char) {
    this.char = char || '*';
    this.mask = false;
};

/**
 * Writes to the mask.
 * @param {string} s
 */
common.rlMask.prototype.write = function(s) {
    if (!this.mask) {
        this.mask = s.indexOf(':') >= 0;
        process.stdout.write(s);
    } else {
        if (s.indexOf('\n') >= 0) {
            process.stdout.write('\n');
        } else {
            for (var i=0; i<s.length; i++) {
                if (/^\w$/.test(s)) process.stdout.write('*');
            }
        }
    }
};

module.exports = common;
