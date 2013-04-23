var path = require("path"),
    os = require("os"),
    cluster = require("cluster"),
    Suite = require(path.join(__dirname, '..', '..', 'test.js')); // for colors

if (!cluster.isMaster) {
    require(path.join(__dirname, 'worker.js'));
} else {
    var worker = cluster.fork();
    var min = 2,
        max = 200,
        size = 100000,
        times = 5;
    
    worker.on("error", function(err) {
        console.error(err);
    });
    
    function calculateRange(range, size, callback) {
        worker.once('message', function(msg) {
            callback(msg['range'], msg['time']);
        });
        worker.send({
            'range':  range,
            'size': size,
            'times': times
        });
    }
    
    function process(range) {
        console.log(("\n Processing range: "+range).white.bold+"\n");
        calculateRange(range, size, function(newRange, time) {
            if (newRange[0] == newRange[1]) {
                console.log("\n Result: ".white.bold+(newRange[0]+"").green.bold+(" ("+(time/1000)+" ms)").grey.bold);
                cluster.disconnect(); // Done
            } else {
                process(newRange);
            }
        });
    }
    process([min,max]);
}