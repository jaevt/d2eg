//
// Module Dependencies
//
var express = require('express')
var router = express.Router();
var passport = require('passport');
var session = require('express-session');
var request = require('request');
var SteamStrategy = require('passport-steam').Strategy;
var twitchStrategy = require("passport-twitch").Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var actualIP = 'localhost';


router.get('/', function(req, res){
  res.render('index', { user: req.session.user, admin: req.session.admin });
});

router.get('/team/:objectID', function(req, res){
  var options = {
    uri: 'http://'+actualIP+'/api/team/'+req.params.objectID,
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

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SteamStrategy({
    returnURL: 'http://'+actualIP+'/auth/steam/return',
    realm: 'http://'+actualIP+'/',
    apiKey: '249E468541DD96A88E69CD0AE42D3284'
  },
  function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

router.get('/auth/steam',passport.authenticate('steam', { failureRedirect: '/' }),function(req, res) {
  res.redirect('/');
});

router.get('/auth/steam/return',passport.authenticate('steam', { failureRedirect: '/' }),function(req, res) {
    console.log(req.user._json);
    var options = {
      uri: 'http://'+actualIP+'/api/player/updateOrCreateIfNotExist',
      method: 'POST',
      json: req.user._json
    };
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var options = {
          uri: 'http://'+actualIP+'/api/player/'+req.user._json.steamid,
          method: 'GET'
        };
        request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(body);
            req.session.user=JSON.parse(body);
            return res.redirect('/');
          }else{
            return res.redirect('/');
          }
        });
      }else{
        console.log(error);
      }
    });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

passport.use(new twitchStrategy({
    clientID: "nis8nvn34bim3zgu3234xz2nykfo22y",
    clientSecret: "23autmdcp2o32uc7qux0yzkaxoyzkct",
    callbackURL: "http://"+actualIP+"/twitch/auth/return",
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

router.get("/twitch/auth", passport.authenticate("twitch",{ failureRedirect: '/' }),function(req, res) {
  res.redirect('/');
});

router.get("/twitch/auth/return", passport.authenticate("twitch", { failureRedirect: "/" }),function(req, res) {
  var options = {
    uri: 'http://'+actualIP+'/api/player/twitch/'+req.session.user._id,
    method: 'POST',
    json: req.user._json
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);

      var options = {
        uri: 'http://'+actualIP+'/api/player/'+req.session.user.steamid,
        method: 'GET'
      };
      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          req.session.user = JSON.parse(body);
          console.log(req.session.user);
          return res.redirect('/players/account');
        }else{
          return res.redirect('/');
        }
      });
    }else{
      console.log("Error al conectar twitch");
    }
  });
});

// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
passport.use(new FacebookStrategy({
    clientID: '284108428599597',
    clientSecret: '286c9e6cbe6460e7b3df392f6236781a',
    callbackURL: '/facebook/auth/return'
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      console.log(profile)
      return done(null, profile);
    });
  }
));
router.get('/facebook/auth', passport.authenticate('facebook'));
router.get('/facebook/auth/return',passport.authenticate('facebook', {successRedirect : '/',failureRedirect: '/'}),function(req, res) {
  console.log(req.user);
  res.redirect('/');
});

module.exports = router;
