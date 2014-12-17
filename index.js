var path = require("path"),
    port = process.env.PORT || 3000;

var root = path.join(process.cwd(), 'public');
var express = require('express');
var app = express();

var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Listening at http://%s:%s', host, port)
});

app.use(express.static(root));
