//
// Module Dependencies
//
var express = require('express');
var router = express.Router();
var request = require('request');
var actualIP = 'localhost';


var secureAccess = function(req, res, next) {
  if (!req.session.user||!req.session.user.isAuthenticated) {
    return res.redirect('/');
  }
  next();
}

router.get('/', function(req, res){
  res.render('admin/players',{user: req.session.user, admin: req.session.admin});
});

router.get('/logout', function(req, res){
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/account',secureAccess, function(req, res){
  return res.render('player/account',{ user: req.session.user, admin: req.session.admin });
});

router.get("/twitch/disconnect",secureAccess,function(req, res) {
  var options = {
    uri: 'http://'+actualIP+'/api/player/twitch/'+req.session.user._id,
    method: 'DELETE'
  };
  request(options, function (error, response, bod) {
    if (!error && response.statusCode == 200) {
      var options = {
        uri: 'http://'+actualIP+'/api/player/'+req.session.user.steamid,
        method: 'GET'
      };
      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          req.session.user=JSON.parse(body);
          req.session.user.isAuthenticated = req.isAuthenticated();
          return res.redirect('/players/account');
        }else{
          return res.redirect('/');
        }
      });
    }else{
      return res.redirect('/');
    }
  });
});

router.get('/:steamid', function(req, res){
  var options = {
    uri: 'http://'+actualIP+'/api/player/'+req.params.steamid,
    method: 'GET'
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body=JSON.parse(body);
      return res.render('player',{user:req.session.user,player:body, admin: req.session.admin});
    }else{
      return res.redirect('/');
    }
  });
});

module.exports = router;
