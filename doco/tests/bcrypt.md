## doco

  - [bcrypt](#bcrypt)
  - [bcrypt.genSaltSync(rounds\*, seed_length\*)](#bcryptgensaltsyncroundsseed_length)
  - [bcrypt.genSalt(rounds\*, seed_length\*, callback\*)](#bcryptgensaltroundsseed_lengthcallback)
  - [bcrypt.hashSync(s, salt\*)](#bcrypthashsyncssalt)
  - [bcrypt.hash(s, salt, callback)](#bcrypthashssaltcallback)
  - [bcrypt.compareSync(s, hash)](#bcryptcomparesyncshash)
  - [bcrypt.compare(s, hash, callback)](#bcryptcompareshashcallback)
  - [bcrypt.getRounds(hash)](#bcryptgetroundshash)
  - [bcrypt.getSalt(hash)](#bcryptgetsalthash)

### bcrypt

bcrypt namespace.



### bcrypt.genSaltSync(rounds\*, seed_length\*)

Synchronously generates a salt.

| Name | Type | Description |
| ---- | ---- | ----------- |
| rounds* | number | Number of rounds to use, defaults to 10 if omitted |
| seed_length* | number | Not supported. |
| **returns:** | string | Resulting salt


### bcrypt.genSalt(rounds\*, seed_length\*, callback\*)

Asynchronously generates a salt.

| Name | Type | Description |
| ---- | ---- | ----------- |
| rounds* | (number &#166; function(Error, ?string)) | Number of rounds to use, defaults to 10 if omitted |
| seed_length* | (number &#166; function(Error, ?string)) | Not supported. |
| callback* | function(Error, ?string) | Callback receiving the error, if any, and the resulting salt |


### bcrypt.hashSync(s, salt\*)

Synchronously generates a hash for the given string.

| Name | Type | Description |
| ---- | ---- | ----------- |
| s | string | String to hash |
| salt* | (number &#166; string) | Salt length to generate or salt to use, default to 10 |
| **returns:** | ?string | Resulting hash, actually never null


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
| **returns:** | boolean | true if matching, otherwise false


### bcrypt.compare(s, hash, callback)

Asynchronously compares the given data against the given hash.

| Name | Type | Description |
| ---- | ---- | ----------- |
| s | string | Data to compare |
| hash | string | Data to be compared to |
| callback | function(Error, boolean) | Callback receiving the error, if any, otherwise the result |


### bcrypt.getRounds(hash)

Gets the number of rounds used to encrypt the specified hash.

| Name | Type | Description |
| ---- | ---- | ----------- |
| hash | string | Hash to extract the used number of rounds from |
| **returns:** | number | Number of rounds used


### bcrypt.getSalt(hash)

Gets the salt from a hash.

| Name | Type | Description |
| ---- | ---- | ----------- |
| hash | string | Hash to extract the salt from |
| **returns:** | string | 

