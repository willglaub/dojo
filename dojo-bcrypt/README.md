<img src="https://raw.github.com/dcodeIO/dojo/master/dojo-small.png" alt="dojo" /><sup>-bcrypt</sup>
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

## doco

  - [bcrypt](#bcrypt)
  - [bcrypt.genSaltSync(rounds\*, seed_length\*)](#bcryptgensaltsyncrounds-seed_length)
  - [bcrypt.genSalt(rounds\*, seed_length\*, callback\*)](#bcryptgensaltrounds-seed_length-callback)
  - [bcrypt.hashSync(s, salt\*)](#bcrypthashsyncs-salt)
  - [bcrypt.hash(s, salt, callback)](#bcrypthashs-salt-callback)
  - [bcrypt.compareSync(s, hash)](#bcryptcomparesyncs-hash)
  - [bcrypt.compare(s, hash, callback)](#bcryptcompares-hash-callback)
  - [bcrypt.getRounds(hash)](#bcryptgetroundshash)
  - [bcrypt.getSalt(hash)](#bcryptgetsalthash)

### bcrypt
bcrypt namespace.


### bcrypt.genSaltSync(rounds\*, seed_length\*)
Synchronously generates a salt.

| Name | Type | Description |
| ---- | ---- | ----------- |
| rounds\* | number | Number of rounds to use, defaults to 10 if omitted |
| seed_length\* | number | Not supported. |
|   |||
| **returns** | string | Resulting salt

### bcrypt.genSalt(rounds\*, seed_length\*, callback\*)
Asynchronously generates a salt.

| Name | Type | Description |
| ---- | ---- | ----------- |
| rounds\* | (number &#166; function(Error, ?string)) | Number of rounds to use, defaults to 10 if omitted |
| seed_length\* | (number &#166; function(Error, ?string)) | Not supported. |
| callback\* | function(Error, ?string) | Callback receiving the error, if any, and the resulting salt |

### bcrypt.hashSync(s, salt\*)
Synchronously generates a hash for the given string.

| Name | Type | Description |
| ---- | ---- | ----------- |
| s | string | String to hash |
| salt\* | (number &#166; string) | Salt length to generate or salt to use, default to 10 |
|   |||
| **returns** | ?string | Resulting hash, actually never null

### bcrypt.hash(s, salt, callback)
Asynchronously generates a hash for the given string.

| Name | Type | Description |
| ---- | ---- | ----------- |
| s | string | String to hash |
| salt | number &#166; string | Salt length to generate or salt to use |
| callback | function(Error, ?string) | Callback receiving the error, if any, and the resulting hash |

### bcrypt.compareSync(s, hash)
Synchronously tests a string against a hash.

| Name | Type | Description |
| ---- | ---- | ----------- |
| s | string | String to compare |
| hash | string | Hash to test against |
|   |||
| **returns** | boolean | true if matching, otherwise false
| **throws** | Error | If an argument is illegal

### bcrypt.compare(s, hash, callback)
Asynchronously compares the given data against the given hash.

| Name | Type | Description |
| ---- | ---- | ----------- |
| s | string | Data to compare |
| hash | string | Data to be compared to |
| callback | function(Error, boolean) | Callback receiving the error, if any, otherwise the result |
|   |||
| **throws** | Error | If the callback argument is invalid

### bcrypt.getRounds(hash)
Gets the number of rounds used to encrypt the specified hash.

| Name | Type | Description |
| ---- | ---- | ----------- |
| hash | string | Hash to extract the used number of rounds from |
|   |||
| **returns** | number | Number of rounds used
| **throws** | Error | If hash is not a string

### bcrypt.getSalt(hash)
Gets the salt portion from a hash.

| Name | Type | Description |
| ---- | ---- | ----------- |
| hash | string | Hash to extract the salt from |
|   |||
| **returns** | string | Extracted salt part portion
| **throws** | Error | If `hash` is not a string or otherwise invalid

Command line
------------
`Usage: bcrypt <input> [salt]`

Credits
-------
Based on work started by Shane Girish at [bcrypt-nodejs](https://github.com/shaneGirish/bcrypt-nodejs), which is itself
based on [javascript-bcrypt](http://code.google.com/p/javascript-bcrypt/).

License
-------
Apache License, Version 2.0 if not stated otherwise in the sources
