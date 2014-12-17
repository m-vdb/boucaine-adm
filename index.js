var express = require('express'),
    session = require('cookie-session'),
    jade = require('jade');

var path = require("path"),
    port = process.env.PORT || 3000,
    secret = process.env.SECRET || "local",
    public = path.join(process.cwd(), 'public'),
    apiRoute = process.env.API_ROUTE || "http://localhost:8080";

// config
var app = express();
app.engine('.jade', jade.__express);
app.use(session({keys: [secret]}));
app.use("/public", express.static(public));

// views
app.get("/", auth, function (req, res) {
  res.render('index.jade', {apiRoute: apiRoute});
});
app.get("/auth", function (req, res) {
  res.render('auth.jade');
});

// listen
var server = app.listen(port, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Listening at http://%s:%s', host, port)
});


// auth middelware
function auth (req, res, next) {
  if (!req.session.uid) {
    res.redirect('/auth');
  }
  else {
    next();
  }
}
