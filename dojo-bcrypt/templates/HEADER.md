<img valign="middle" src="https://raw.github.com/dcodeIO/dojo/master/dojo-small.png" alt="dojo" /> bcrypt
===========
Optimized bcrypt in plain JavaScript with zero dependencies. ADVANCED_OPTIMIZATIONS, 100% typed code. Fully compatible
to [bcrypt](https://npmjs.org/package/bcrypt) and used in [dojo](https://github.com/dcodeIO/dojo).

Usage - Sync
------------
To hash a password: 

```javascript
var bcrypt = require('dojo-bcrypt');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);
// Store hash in your password DB.
```

To check a password: 

```javascript
// Load hash from your password DB.
bcrypt.compareSync("B4c0/\/", hash); // true
bcrypt.compareSync("not_bacon", hash); // false
```

Auto-gen a salt and hash:

```javascript
var hash = bcrypt.hashSync('bacon', 8);
```

Usage - Async
-------------
To hash a password: 

```javascript
var bcrypt = require('dojo-bcrypt');
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("B4c0/\/", salt, function(err, hash) {
        // Store hash in your password DB.
    });
});
```

To check a password: 

```javascript
// Load hash from your password DB.
bcrypt.compare("B4c0/\/", hash, function(err, res) {
    // res == true
});
bcrypt.compare("not_bacon", hash, function(err, res) {
    // res = false
});
```

Auto-gen a salt and hash:

```javascript
bcrypt.hash('bacon', 8, function(err, hash) {
});
```

