var http = require("http"),
    path = require("path"),
    port = process.env.PORT || 3000;

var root = path.join(process.cwd(), 'public');
var static = require('node-static');
var file = new static.Server(root);

http.createServer(function(request, response) {
  // serve files
  request.addListener('end', function () {
    file.serve(request, response);
  }).resume();
}).listen(port);
 
console.log("Static file server running at http://localhost:" + port + "/");
