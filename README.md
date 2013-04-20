<h1 align="center">
    <img src="https://raw.github.com/dcodeIO/dojo/master/dojo.png" alt="dojo - the node.js application server" />
</h1>

**Ever thought about enrolling at a dojo?** Do you already know or want to learn some jitsu? Then dojo is for you.

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
A database server inspired by mongoDB, implemented on top of node.js.

#### [dojo-test](https://npmjs.org/package/dojo-test)
Test [à la dojo](https://github.com/dcodeIO/dojo/tree/master/dojo-test).

#### [dojo-common](https://npmjs.org/package/dojo-common)
Basic utilities shared between packages.

#### [dojo-bcrypt](https://npmjs.org/package/dojo-bcrypt)
Optimized native bcrypt with zero dependencies. 100% typed code. Fully compatible to 'bcrypt'.

#### [dojo](https://npmjs.org/package/dojo)
Compound package of dojo, including all of the above as a single easy to use package. Also reduces redundant
dependencies.

As for now, dojo builds on the following first class packages available on npm:

* [haibu](https://npmjs.org/package/haibu) by nodejitsu

  Spawn your own node.js clouds, on your own hardware. dojo currently uses a custom build of haibu that fixes some
  problems, especially on the windows platform.
   
* [daemonize2](https://npmjs.org/package/daemonize2) by Kuba Niegowski

  Module for easy creation of daemons for Node 0.8.x.
  
* [jugglingdb](https://npmjs.org/package/jugglingdb) by Anatoliy Chakkaev

  ORM for every database: redis, mysql, neo4j, mongodb, couchdb, postgres, sqlite
  
* [ByteBuffer.js](https://npmjs.org/package/bytebuffer)

  A Java-like, Netty-inspired ByteBuffer implementation using typed arrays.
  
If dojo actually uses a dependency this is always for a good reason. Usually, node.js provides most of the required
functionality out of the box so if a library is used in dojo, it's considered pretty lean and stable by us. As a result
you won't end up downloading hundreds of partly redundant dependencies when installing dojo. Unfortunately, that's not
the philosophy used in haibu, but we are ok with that as it's really a one of a kind app.

Current state
-------------
Still screwing together the parts.
<p align="center">
    <img src="https://raw.github.com/dcodeIO/dojo/master/preview.jpg" alt="dojo-cli preview" />
</p>
  
License
-------
All of dojo's packages are licensed under the Apache License, Version 2.0 and may be used for free, personally and
commercially. However, if dojo is useful for you or your company, please consider supporting us so that we are able
to continue making dojo even better and easier to use. [Contact us](mailto:dcode@dcode.io)!

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/dcodeIO/dojo/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
