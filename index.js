var express = require('express'),
    session = require('cookie-session'),
    jade = require('jade'),
    bodyParser = require('body-parser');

var path = require("path"),
    port = process.env.PORT || 3000,
    secret = process.env.SECRET || "local",
    public = path.join(process.cwd(), 'public'),
    fonts = path.join(public, "fonts"),
    apiRoute = process.env.API_ROUTE || "http://localhost:8080",
    admin = [
      process.env.ADMIN_USERNAME || "admin",
      process.env.ADMIN_PASSWORD || "password"
    ];

// config
var app = express();
app.engine('.jade', jade.__express);
app.use(session({keys: [secret]}));
app.use("/public", express.static(public));
app.use("/fonts", express.static(fonts));
app.use(bodyParser.urlencoded({extended: true}));

// views
app.get("/", auth, function (req, res) {
  res.render('index.jade', {apiRoute: apiRoute});
});
app.get("/auth", function (req, res) {
  res.render('auth.jade');
});
app.post("/auth", function (req, res) {
  if (req.body.username === admin[0] && req.body.password === admin[1]) {
    req.session.uid = req.body.username;
    res.redirect("/");
  }
  else {
    delete req.session.uid;
    res.render("auth.jade", {error: "Nom d'utilisateur ou mot de passe invalide."});
  }
});
app.get("/support", function (req, res) {
  res.render('support.jade', {});
});
app.get("/app", function (req, res) {
  res.writeHead(302,
    {Location: 'https://itunes.apple.com/fr/app/pizza-la-boucaine/id955355631'}
  );
  res.end();
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
