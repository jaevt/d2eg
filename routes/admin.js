//
// Module Dependencies
//
var express = require('express');
var router = express.Router();
var request = require('request');
var md5 = require('md5');
var actualIP = 'localhost';

router.get('/', function(req, res){
  if(!req.session.admin) return res.render('admin/login',{user: req.session.user, admin: req.session.admin});
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

router.get('/account', function(req, res){
  if(!req.session.admin) return res.render('admin/login',{ user: req.session.user, admin: req.session.admin });
  res.render('admin/account',{ user: req.session.user, admin: req.session.admin });
});

router.get('/leagues', function(req, res){
  if(!req.session.admin) return res.redirect('/');
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

router.get('/leagues/create',function(req,res){
  if(!req.session.admin) return res.redirect('/');
  res.render('admin/create-league',{ user: req.session.user, admin: req.session.admin});
});

router.get('/leagues/edit/:_id',function(req,res){
  if(!req.session.admin) return res.redirect('/');
  res.render('admin/edit-league',{ user: req.session.user, admin: req.session.admin,leagueid: req.params._id });
});

router.post('/leagues/edit/:_id', function(req, res){
  if(!req.session.admin) return res.redirect('/');
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

router.post('/leagues/create', function(req, res){
  if(!req.session.admin) return res.redirect('/');
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

router.get('/leagues/delete/:_id', function(req, res){
  if(!req.session.admin) return res.redirect('/');
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

router.get('/players',function (req,res){
  if(!req.session.admin) return res.redirect('/');
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

router.post('/go/login', function(req, res){
  var options = {
    uri: 'http://'+actualIP+'/api/admin/login/',
    method: 'POST',
    json: {
            pass:md5(req.body.pass),
            mail: req.body.mail
          }
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body.admin);
      if(!body.error){

        req.session.admin = body.admin;
        console.log(req.session.admin);
      }
      return res.redirect('/');
    }else{
      console.log(error);
      return res.redirect('/');
    }
  });
});

module.exports = router;
