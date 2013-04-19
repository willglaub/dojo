var path = require("path"),
    http = require("http"),
    Client = require(path.join(__dirname, "..", "api.js")),
    Test = require(path.join(__dirname, "..", "test.js"));

var server = http.createServer(function(req, res) {
    var data = {}, body = '', code = 200;
    data.method = req.method;
    data.url = req.url;
    if (data.url == '/login') {
        data.token = 'hello';
    }
    data.headers = req.headers;
    if (data.url == '/error') {
        code = 401;
    }
    
    var head = {
        'Content-Type': 'application/json',
        'Server': 'dojo'
    };
    
    req.on("data", function(chunk) {
        body += chunk;
    });
    
    req.on("end", function() {
        data.body = body ? JSON.parse(body) : null;
        data = JSON.stringify(data);
        head['Content-Length'] = data.length;
        res.writeHead(code, head);
        res.end(data);
    });
});

var client;
var suite = {
    'start': function(test) {
        test.log("Server started on port "+server.address().port);
        client = new Client("http://localhost:"+server.address().port);
        test.done();
    },
    
    'get': function(test) {
        client.get("/", {}, function(err, res) {
            test.equal(res.method, 'GET');
            test.done();
        });
    },
    
    'delete': function(test) {
        client.del("/", {}, function(err, res) {
            test.equal(res.method, 'DELETE');
            test.done();
        });
    },
    
    'post': function(test) {
        client.post("/", {}, function(err, res) {
            test.equal(res.method, 'POST');
            test.done();
        });
    },
    
    'put': function(test) {
        client.put("/", {}, function(err, res) {
            test.equal(res.method, 'PUT');
            test.done();
        });
    },
    
    'login': function(test) {
        client.login("admin", "admin", function(err, res) {
            test.ifError(err);
            test.equal(res.method, 'POST');
            test.equal(res.url, '/login');
            test.equal(res.body.name, 'admin');
            test.ok(res.body.password);
            test.equal(client.token, 'hello');
            test.done();
        });
    },
    
    'token': function(test) {
        client.get("/", {}, function(err, res) {
            test.equal(res.headers['authorization'], 'Basic YWRtaW46aGVsbG8=');
            test.done();
        });
    },
    
    'error': function(test) {
        client.get("/error", {}, function(err, res) {
            test.ok(err);
            test.equal(err.message, "401 Unauthorized");
            test.done();
        });
    }
};

server.listen(/* random port */ 0, "localhost", function() {
    Test.run(suite);
});
