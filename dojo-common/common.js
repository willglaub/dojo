/*
 Copyright 2013 The dojo authors (http://www.dojojs.org)

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * @license dojo-common (c) 2013 Daniel Wirtz <dcode@dojojs.org>
 * Released under the Apache License, Version 2.0
 * see: http://www.dojojs.org for details
 */
module.exports = (function() {
    
    var path = require("path");

    /**
     * dojo common namespace.
     * @type {Object.<string,*>}
     */
    var common = {};

    /**
     * Package information.
     * @type {Object.<string,*>}
     */
    common.pkg = require(path.join(__dirname, 'package.json'));

    /**
     * dojo alphabet.
     * @type {Object.<string,Array.<string>>}
     */
    common.alphabet = require(path.join(__dirname, 'alphabet.json'));

    /**
     * npm: dojo-bcrypt
     * @type {bcrypt}
     */
    common.bcrypt = require(path.join(__dirname, 'bcrypt.js'));

    /**
     * npm: colors
     * @type {?}
     */
    common.colors = require(path.join(__dirname, 'colors.js'));

    /**
     * npm: semver
     * @type {semver}
     */
    common.semver = require(path.join(__dirname, 'lib', 'semver.min.js'));

    /**
     * npm: pkginfo
     * @type {pkginfo}
     */
    common.semver = require(path.join(__dirname, 'lib', 'pkginfo.min.js'));

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
     * Creates a cli banner in dojo alphabet
     * @param {string=} title Title in dojo alphabet
     * @param {string=} appendix Title appendix
     * @returns {string}
     */
    common.banner = function(title, appendix) {
        // Wrap for the case colors got disabled later on
        return buildBanner(title || "dojo", appendix || (common.pkg['version']+" (c) "+common.pkg['author']));
    };

    /**
     * Builds a banner.
     * @param {string} title Title in dojo alphabet
     * @param {string} appendix Title appendix
     * @returns {string}
     */
    function buildBanner(title, appendix) {
        var lines = [" ", " ", " "], c, a, j;
        for (var i=0; i<title.length; i++) {
            c = title.charAt(i);
            if (a = common.alphabet[c]) for (j=0; j<3; j++) lines[j] += a[j];
        }
        for (i=0; i<lines.length; i++) lines[i] = lines[i].green.bold;
        lines[1] += " "+appendix+" » www.dojojs.org".grey.bold;
        return '\n'+lines.join('\n')+'\n';
    }

    /**
     * Cli colored dojo.
     * @type {string}
     */
    common.dojo = function() {
        return "dojo".green.bold; // See above
    };

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
     * @param {Array.<string>=} pargv Command line arguments to parse
     * @returns {{node: string, script: string, argv: Array.<string>, opt: Object.<string,boolean|string>}}
     */
    common.getopt = function(pargv) {
        // NOTE (dcode): I actually don't get why there are so many option parsers with fancy dependencies around. Node
        // already handles most of it for us and all we need to do is to put it into an easy to use object based on our
        // conventions, that is:
        // 
        // All options may be preceded by as many "-" characters as a user can type. If an option has a value, it's
        // specified using `--option=value` or, if the value has multiple words `--option="one two"`. Node handles this
        // correctly for us and strips the quotes. If an option has no value, it will evaluate to `true`, e.g. `--off`.
        //
        // What we get out of this function is an object with `argv` where indexes 0 and 1 have been shifted. The values
        // of those two are available through `node` and `script`. Our options reside in `opt` and have been stripped 
        // from `argv` and are no more preceded by "-". That's all about it and it's super fast with no dependencies
        // attached. Tested on good ol' Windows with and without Cygwin.
        
        pargv = pargv || process.argv;
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
            'node': pargv[0],
            'script': pargv[1],
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

    return common;
    
})();
