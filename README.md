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

#### [doco](https://npmjs.org/package/doco)
The documentation generator used to document all dojo packages.

#### [dojo-common](https://npmjs.org/package/dojo-common)
Basic utilities shared between packages.

#### [dojo-bcrypt](https://npmjs.org/package/dojo-bcrypt)
Optimized native bcrypt with zero dependencies. 100% typed code. Fully compatible to 'bcrypt'.

#### [dojo](https://npmjs.org/package/dojo)
Compound package of dojo, including all of the above as a single easy to use package. Also reduces redundant
dependencies.

Current state
-------------
Still screwing together the parts.
<p align="center">
    <img src="https://raw.github.com/dcodeIO/dojo/master/preview.jpg" alt="dojo-cli preview" />
</p>

Credits
-------
dojo builds on first class packages available on npm. To see which ones, please see the respective subdirectory's
README. However, dojo currently does not depend on any external packages for the reason that all packages are taken
under review and, till all quality aspects have been made clear, are bundled within the dojo package fur further
development iterations. All authors of the specific libraries are invited to participate and may, of course, pull our
changes to their own repositories.

License
-------
All of dojo's packages are licensed under the Apache License, Version 2.0, if not stated otherwise in the sources and
may be used for free, personally and commercially. However, if dojo is useful for you or your company, please consider
supporting us so that we are able to continue making dojo even better and easier to use. [Contact us](mailto:dcode@dcode.io)!
