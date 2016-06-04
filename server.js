//
// Module dependencies
//
var express = require('express');
var passport = require('passport');
var session = require('express-session');
var router = express.Router();
var webpagesrouter = require('./webpagesrouter');
var apiplayer = require('./api/player');
var apiteam = require('./api/team');
var apiadmin = require('./api/admin');
var apileague = require('./api/league');
var bodyParser  = require("body-parser");
var routeadmin = require("./routes/admin");
var routeplayer = require("./routes/player");
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(session({
  secret: 'd2eg es la cumbia',
  name: 'jugador',
  resave: true,
  saveUninitialized: true}
));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname));
app.use('/admin',routeadmin);
app.use('/players',routeplayer);
app.use('/api/player',apiplayer);
app.use('/api/admin',apiadmin);
app.use('/api/league',apileague);
app.use('/',webpagesrouter);
app.use('*',function(req,res){
  res.render('404',{ user: req.session.user, admin: req.session.admin});
});
app.listen(80);
