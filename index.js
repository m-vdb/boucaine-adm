var express = require('express'),
    session = require('cookie-session'),
    jade = require('jade');

var path = require("path"),
    port = process.env.PORT || 3000,
    secret = process.env.SECRET || "local",
    public = path.join(process.cwd(), 'public');

// config
var app = express();
app.engine('.html', jade.__express);
app.engine('.jade', jade.__express);
app.use(session({keys: [secret]}));
app.use("/public", express.static(public));

// views
app.get("/", auth, function (req, res) {
  res.render('index.html');
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
