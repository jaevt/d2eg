//
// Module Dependencies
//
var express = require('express');
var router = express.Router();
var request = require('request');
var md5 = require('md5');
var actualIP = 'localhost';

var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

passport.use(new Auth0Strategy({
    domain:       'jaevt.auth0.com',
    clientID:     'H9JoH4DKEOuoyGxEnBl9MyrKRI19L7IQ',
    clientSecret: 'rzZS35dg3KtV1fOio45OKRzixHeSoZHBimggTOY6lS-eK3JY-7wyrfYzk9z-eKRF',
    callbackURL:  'http://'+actualIP+'/admin/return'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  })
);

// This is not a best practice, but we want to keep things simple for now
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var secureAccess = function(req, res, next) {
  if (!req.session.admin||!req.session.admin.isAuthenticated) {
    return res.redirect('/admin/login');
  }
  next();
}

router.get('/return',passport.authenticate('auth0', { failureRedirect: '/404' }),function(req, res) {
  console.log(req.user._json);
  var options = {
    uri: 'http://'+actualIP+'/api/admin/',
    method: 'POST',
    json: req.user._json
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var options = {
        uri: 'http://'+actualIP+'/api/admin/'+req.user._json.user_id,
        method: 'GET'
      };
      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          body = JSON.parse(body);
          console.log(body);
          req.session.admin= body.admin;
          req.session.admin.isAuthenticated = req.isAuthenticated();
          res.redirect("/admin/account");
        }else{
          console.log(error);
          return res.redirect('/');
        }
      });
    }else{
      console.log(error);
      return res.redirect('/');
    }
  });
});

router.get('/',secureAccess, function(req, res){
  return res.render('admin/account',{user: req.session.user, admin: req.session.admin});
});

router.get('/login', function(req, res){
  res.render('admin/login',{user: req.session.user, admin: req.session.admin});
});

router.get('/logout', function(req, res){
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/account',secureAccess, function(req, res){
  res.render('admin/account',{ user: req.session.user, admin: req.session.admin });
});

router.get('/leagues',secureAccess, function(req, res){
  var options = {
    uri: 'http://'+actualIP+'/api/league/',
    method: 'GET'
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      res.render('admin/leagues',{ user: req.session.user, admin: req.session.admin,leagues: body.leagues });
    }else{
      console.log(error);
      return res.redirect('/');
    }
  });
});

router.get('/leagues/create',secureAccess,function(req,res){
  res.render('admin/create-league',{ user: req.session.user, admin: req.session.admin});
});

router.get('/leagues/edit/:_id', secureAccess,function(req,res){
  res.render('admin/edit-league',{ user: req.session.user, admin: req.session.admin,leagueid: req.params._id });
});

router.post('/leagues/edit/:_id',secureAccess, function(req, res){
  var options = {
    uri: 'http://'+actualIP+'/api/league/'+req.params._id,
    method: 'PUT',
    json: req.body
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.redirect('/admin/leagues');
    }else{
      console.log(error);
      return res.redirect('/');
    }
  });
});

router.post('/leagues/create',secureAccess, function(req, res){
  var options = {
    uri: 'http://'+actualIP+'/api/league/',
    method: 'POST',
    json: {
      admin: req.session.admin._id,
      league: req.body
    }
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.redirect('/admin/leagues');
    }else{
      console.log(error);
      return res.redirect('/');
    }
  });
});

router.get('/leagues/delete/:_id',secureAccess, function(req, res){
  var options = {
    uri: 'http://'+actualIP+'/api/league/'+req.params._id,
    method: 'DELETE'
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.redirect('/admin/leagues');
    }else{
      return res.redirect('/');
    }
  });
});

router.get('/players',secureAccess,function (req,res){
  var options = {
    uri: 'http://'+actualIP+'/api/player/',
    method: 'GET'
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      res.render('admin/players',{ user: req.session.user, admin: req.session.admin,players: body.players });
    }else{
      console.log(error);
      return res.redirect('/');
    }
  });
});

module.exports = router;
