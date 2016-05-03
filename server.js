var express = require('express');
var passport = require('passport');
var session = require('express-session');
var router = express.Router();
var webpagesrouter = require('./webpagesrouter');
var apiplayer = require('./api/player');
var apiteam = require('./api/team');
var bodyParser  = require("body-parser");
var app = express();

// configure Express
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
app.use('/api/team',apiteam);
app.use('/api/player',apiplayer);
app.use('/',webpagesrouter);

app.listen(3000);
