dojo - the node.js application server.
======================================
Ever thought about enrolling at a dojo? Do you already know or want to learn some jitsu? Then dojo is for you.

dojo is an application server built on top of the node.js ecosystem. Its philosophy is to create a full-featured
application server using first-class open-source packages that are available on npm. It comes with a simple to use API
and a command line interface for easy deployment of your node.js apps to your own or hosted infrastructure.

The dojo ecosystem
------------------

#### [dojo-d](https://npmjs.org/package/dojo-d)
The dojo application server and `dojod` command line tool built on top of nodejitsu's excellent haibu.

#### [dojo-cli](https://npmjs.org/package/dojo-cli)
The `dojo` command line tool for easy deployment of your apps to dojo-d inspired by nodejitsu's [jitsu](https://npmjs.org/package/jitsu)
command line tool.

#### [dojo-api](https://npmjs.org/package/dojo-api)
Easy to use API wrapper for dojo-d's API.

#### [dojo-db](https://npmjs.org/package/dojo-db)
A database inspired by mongoDB, implemented on top of node.js.

#### [dojo](https://npmjs.org/package/dojo)
Compound package of dojo, including all of the above as a single easy to use package. Also reduces redundant
dependencies.

As for now, dojo builds on the following first class packages available on npm:

* [haibu](https://npmjs.org/package/haibu) by nodejitsu 
  A node.js application server - spawn your own node.js clouds, on your own hardware. dojo currently uses a custom build
  of haibu that fixes some problems, especially on the windows platform.
* [request](https://npmjs.org/package/request) by Mikeal Rogers 
  A simplified HTTP request client.
* [bcrypt-nodejs](https://npmjs.org/package/bcrypt-nodejs) by Shane Girish 
  A native JS bcrypt library for NodeJS.
* [daemonize2](https://npmjs.org/package/daemonize2) by Kuba Niegowski 
  Module for easy creation of daemons for Node 0.8.x.
* [jugglingdb](https://npmjs.org/package/jugglingdb) by Anatoliy Chakkaev 
  ORM for every database: redis, mysql, neo4j, mongodb, couchdb, postgres, sqlite
* [ByteBuffer.js](https://npmjs.org/package/bytebuffer) 
  A Java-like, Netty-inspired ByteBuffer implementation using typed arrays.
  
On "dojo"
---------
dojo is not affiliated by nor endored with The Dojo Foundation. We believe that a meaningful naming is a key to a
project's success and therefor picked the naming that best resembles what our product stands for. dojo does not
conflict with The Dojo Toolkit, which is a client-side framework, so we are quite ok with that and hope that our
valuable colleagues at The Dojo Foundation are also. Keep up the good work, pals!

License
-------
All of dojo's packages are licensed under the Apache License, Version 2.0 and may be used for free, personally and
commercially. However, if dojo is useful for you or your company, please consider supporting us so that we are able
to continue making dojo even better and easier to use. [Contact us]!
