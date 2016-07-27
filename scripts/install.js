console.log("Down loading ... Sass Lib");

var fs = require('fs');
var http = require('http');

var download = function(url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function(response) {

        // check if response is success
        if (response.statusCode !== 200) {
            return cb('Response status was ' + response.statusCode);
        }

        response.pipe(file);

        file.on('finish', function() {
            file.close(cb); // close() is async, call cb after close completes.
        });
    });

    // check for request error too
    request.on('error', function(err) {
        fs.unlink(dest);

        if (cb) {
            return cb(err.message);
        }
    });

    file.on('error', function(err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)

        if (cb) {
            return cb(err.message);
        }
    });
};



//"+process.versions.modules
var version_modules = [11, 14, 42, 43, 44, 45, 46, 47];

for (var i in version_modules) {
    (function(moduleVer) {
        var nodeBindingName = "node-sass/vendor/" + process.platform + "-" + process.arch + "-" + moduleVer;
        if (!fs.existsSync(nodeBindingName)) {
            fs.mkdirSync(nodeBindingName);
        }

        var bindingNodePath = nodeBindingName + "/binding.node";
        download("http://cdn.original-fun.com/jdf/node-sass-binaries/" + process.platform + "-" + process.arch + "-" + moduleVer + "_binding.node",
            bindingNodePath,
            function(err) {
                if (!err) {
                    console.log("finish:" + nodeBindingName);
                }
            })
    })(version_modules[i])
}