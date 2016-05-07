var express = require('express')
var router = express.Router();
var passport = require('passport');
var session = require('express-session');
var bodyParser  = require("body-parser");
var SteamStrategy = require('passport-steam').Strategy;
var request = require('request');
var twitchStrategy = require("passport-twitch").Strategy;

//para generar POST's
var querystring = require('querystring');
var http = require('http');

var actualIP = 'jaevt.cl';







router.get('/', function(req, res){
  res.render('index', { user: req.session.user });
});
// Pregunta a la API por el steamid que llega a traves de parametro.
// La respuesta de esta es enviada a un archivo ejs el cual mostrará los resultados
// tanto que si existe o no el steamid consultado.
// Además de enviarse la session de usuario, que en caso de no existir también
// será confirmada en la página ejs.
router.get('/player/:steamid', function(req, res){
  var options = {
    uri: 'http://'+actualIP+':3000/api/player/'+req.params.steamid,
    method: 'GET'
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body=JSON.parse(body);
      return res.render('player',{user:req.session.user,player:body});
    }else{
      return res.redirect('/');
    }
  });
});

router.get('/team/:objectID', function(req, res){
  var options = {
    uri: 'http://'+actualIP+':3000/api/team/'+req.params.objectID,
    method: 'GET'
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body=JSON.parse(body);
      console.log(body);
      return res.redirect('/');
      //res.render('team',{user:req.session.user,team:body});
    }else{
      return res.redirect('/');
    }
  });
});

// Esto agrega un usuario, en caso de existir el steamid de este usuario
// devolvera un error, si no existe lo agregará.
// Luego actualizara la información del usuario que está en el sistema
// con los datos que entrega Steam.
// También queda como el req.session.user el player que retorna después de actualizar.

router.get('/login', ensureAuthenticated, function(req, res){;
  var options = {
    uri: 'http://'+actualIP+':3000/api/player/updateOrCreateIfNotExist',
    method: 'POST',
    json: req.session.user
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var options = {
        uri: 'http://'+actualIP+':3000/api/player/'+req.session.user.steamid,
        method: 'GET'
      };
      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          if(body.error){
            console.log("HUBO UN ERROR WASHITO");
          }
          console.log(body);
          req.session.user=JSON.parse(body);
          return res.redirect('/');
        }else{
          return res.redirect('/');
        }
      });
    }else{
      console.log("Error");
    }
  });
});

router.get('/account', function(req, res){
  res.render('account',{ user: req.session.user , mensaje: "Agregue un correo para comunicarnos contigo. Nos empeñamos en NO enviar SPAM"});
});
router.get('/account/update/',function(req,res){
  var put_req = http.request({
      host: actualIP,
      port: 3000,
      path: '/api/player/'+req.session.user.steamid,
      method: 'PUT',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(querystring.stringify({
            mail:req.query.mail
          }))
      }
  },function(response){
      var output = '';
      response.setEncoding('utf8');
      response.on('data', function (chunk) {
          output += chunk;
      });
      response.on('end', function() {
          var obj = JSON.parse(output);
          req.session.user = obj;
      });
  });
  put_req.write(querystring.stringify({mail:req.query.mail}));
  put_req.end();
  res.redirect('/');
});
router.get('/logout', function(req, res){
  req.logout();
  req.session.destroy();
  res.redirect('/');
});
router.get('/league/', function(req, res){
  res.render('league_home', { user: req.session.user, query : req.query });
});
router.get('/league/:id', function(req, res){
  res.render('league_template', { user: req.session.user, league: req.params });
});
// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Steam profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the SteamStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.
passport.use(new SteamStrategy({
    returnURL: 'http://'+actualIP+':3000/auth/steam/return',
    realm: 'http://'+actualIP+':3000/',
    apiKey: '249E468541DD96A88E69CD0AE42D3284'
  },
  function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Steam profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Steam account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));




// GET /auth/steam
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Steam authentication will involve redirecting
//   the user to steamcommunity.com.  After authenticating, Steam will redirect the
//   user back to this application at /auth/steam/return
router.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    console.log(req.user._json);
    req.session.user = req.user._json;
    return res.redirect('/login');
  });

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

passport.use(new twitchStrategy({
    clientID: "nis8nvn34bim3zgu3234xz2nykfo22y",
    clientSecret: "23autmdcp2o32uc7qux0yzkaxoyzkct",
    callbackURL: "http://"+actualIP+":3000/twitch/auth/return",
    scope: "user_read"
  },
  function(accessToken, refreshToken, profile, done) {
    profile.accessToken = accessToken;
    profile.refreshToken = refreshToken;
    return done(null,profile);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

router.get("/twitch/auth", passport.authenticate("twitch",{ failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
});
router.get("/twitch/auth/return", passport.authenticate("twitch", { failureRedirect: "/" }),function(req, res) {
    // Successful authentication, redirect home.
    var options = {
      uri: 'http://'+actualIP+':3000/api/player/connectTwitch/'+req.session.user.steamid,
      method: 'POST',
      json: req.user._json
    };
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log("Funciono");
      }else{
        console.log("Error");
      }
    });
    var options = {
      uri: 'http://'+actualIP+':3000/api/player/'+req.session.user.steamid,
      method: 'GET'
    };
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        req.session.user=JSON.parse(body);
        return res.redirect('/');
      }else{
        return res.redirect('/');
      }
  });
});




module.exports = router;
