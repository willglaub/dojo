dojo-bcrypt
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

API
---

`bcrypt.`

  * `genSaltSync(rounds, seed_length)`
    * `rounds` - [OPTIONAL] - the number of rounds to process the data for. (default - 10)
    * `seed_length` - [NOT_SUPPORTED] - RAND_bytes wants a length. to make that a bit flexible, you can specify a seed_length. (default - 20)
  * `genSalt(rounds, seed_length, cb)`
    * `rounds` - [OPTIONAL] - the number of rounds to process the data for. (default - 10)
    * `seed_length` - [NOT_SUPPORTED] - RAND_bytes wants a length. to make that a bit flexible, you can specify a seed_length. (default - 20)
    * `cb` - [REQUIRED] - a callback to be fired once the salt has been generated. uses eio making it asynchronous.
      * `err` - First parameter to the callback detailing any errors.
      * `salt` - Second parameter to the callback providing the generated salt.
  * `hashSync(data, salt)`
    * `data` - [REQUIRED] - the data to be encrypted.
    * `salt` - [REQUIRED] - the salt to be used in encryption.
  * `hash(data, salt, cb)`
    * `data` - [REQUIRED] - the data to be encrypted.
    * `salt` - [REQUIRED] - the salt to be used to hash the password. if specified as a number then a salt will be generated and used (see examples).
    * `cb` - [REQUIRED] - a callback to be fired once the data has been encrypted. uses eio making it asynchronous.
      * `err` - First parameter to the callback detailing any errors.
      * `encrypted` - Second parameter to the callback providing the encrypted form.
  * `compareSync(data, encrypted)`
    * `data` - [REQUIRED] - data to compare.
    * `encrypted` - [REQUIRED] - data to be compared to.
  * `compare(data, encrypted, cb)`
    * `data` - [REQUIRED] - data to compare.
    * `encrypted` - [REQUIRED] - data to be compared to.
    * `cb` - [REQUIRED] - a callback to be fired once the data has been compared. uses eio making it asynchronous.
      * `err` - First parameter to the callback detailing any errors.
      * `same` - Second parameter to the callback providing whether the data and encrypted forms match [true | false].
  * `getRounds(encrypted)` - return the number of rounds used to encrypt a given hash
    * `encrypted` - [REQUIRED] - hash from which the number of rounds used should be extracted.
    
Credits
-------
Based on work started by Shane Girish at [bcrypt-nodejs](https://github.com/shaneGirish/bcrypt-nodejs), which is itself
based on [javascript-bcrypt](http://code.google.com/p/javascript-bcrypt/).

License
-------
Apache License, Version 2.0 if not stated otherwise in the sources
