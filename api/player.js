//
// Module dependencies
//
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Player = require('./model/player');

router.post('/', function(req, res){
  var player = new Player;
  player.personaname = req.body.personaname;
  player.realname = req.body.realname;
  player.mail = req.body.mail;
  player.password = req.body.password;
  player.save(function(err){
    if(err) return res.json({"error": true, "mensaje": "Error al crear jugador", err});
    return res.json({"mensaje":"Jugador creado con exito"});
  });
});

router.get('/', function(req, res){
  Player.find({}, function(err,players){
    if(err) return res.json({"error": true,"mensaje": "Error al buscar jugadores", err});
    return res.json({"mensaje": "Busqueda correcta de jugadores", "players": players});
  });
});

router.post('/updateOrCreateIfNotExist', function(req, res){
  Player.findOneAndUpdate(
    {
      "steamid": req.body.steamid
    },
    //Update
    {
      steamid: req.body.steamid,
      account_id: req.body.steamid - 76561197960265728,
      personaname: req.body.personaname,
      realname: req.body.realname,
      avatar: req.body.avatar,
      avatarmedium: req.body.avatarmedium,
      avatarfull: req.body.avatarfull
    },
    //Options
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    },function(err, result){
      if(err) return res.json({"error": true, "mensaje": err});
      return res.json({"mensaje": "Hecho"});
    // do something with the document)
    }
  );
});

router.post('/twitch/:_id', function(req, res){
  Player.findByIdAndUpdate(req.params._id,{ twitch: req.body },{ upsert: true, new: true, setDefaultsOnInsert: true },function(err, player){
    if(err) return res.json({"error": true, "mensaje":"Error al buscar" ,err});
    return res.json({"mensaje": "Hecho"});
  });
});

router.delete('/twitch/:_id', function(req, res){
  Player.findByIdAndUpdate(req.params._id,{ twitch: null },{ upsert: true, new: true, setDefaultsOnInsert: true },function(err, result){
    if(err) return res.json({"error": true, "mensaje": err});
    return res.json({"mensaje": "Hecho"});
  });
});

router.get('/:steamid', function(req, res){
  Player.findOne({"steamid": req.params.steamid},function(err,player){
    if(err) return res.json({"error": true, "mensaje": err});
    return res.json(player);
  });
});

router.delete('/:_id', function(req, res){
  Player.findByIdAndRemove(req.params._id, function(err) {
      if (err) return res.json({"error": true, "mensaje":err});
      return res.json({"mensaje":"Player eliminado"});
  });
});

module.exports = router;
