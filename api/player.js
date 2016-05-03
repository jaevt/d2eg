var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Player = require('./model/Player');
var connection = mongoose.createConnection('mongodb://localhost:27017/test');

router.post('/updateOrCreateIfNotExist', function(req, res){
  Player.findOneAndUpdate(
    //Query
    {
      "steamid": req.body.steamid
    },
    //Update
    {
      steamid: req.body.steamid,
      account_id: req.body.steamid - 76561197960265728,
      personaname: req.body.personaname,
      realname: req.body.realname,
      avatar: req.body.avatar
    },
    //Options
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    },function(err, result){
      if(err) return res.json(JSON.stringify({"error": true, "mensaje": err},null,4));
      return res.json(JSON.stringify({"mensaje": "Hecho"},null,4));
    // do something with the document)
    }
  );
});

router.post('/connectTwitch/:steamid', function(req, res){
  console.log("REQ BODY"+ req.params.steamid);
  Player.findOneAndUpdate(
    //Query
    {
      "steamid": req.params.steamid
    },
    //Update
    {
      twitch: {
        _id: req.body._id,
        name: req.body.name,
        logo: req.body.logo
      }
    },
    //Options
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    },function(err, result){
      if(err) return res.json(JSON.stringify({"error": true, "mensaje": err},null,4));
      return res.json(JSON.stringify({"mensaje": "Hecho"},null,4));
    // do something with the document)
    }
  );
});

// 1.b  player READ
//      Devolvemos un jugador indicado por su (steamid)
//      IN {steamid}
//      OUT {jugador{steamid,personaname,realname,mail,avatar}} || {error,mensaje}
router.get('/:steamid', function(req, res){
  Player.findOne({"steamid": req.params.steamid},function(err,player){
    if(err) return res.json(JSON.stringify({"error": true, "mensaje": err},null,4));
    return res.json(player);
  });
});
// 1.c  player UPDATE
//      Actualizamos el player con su (steamid)
//      IN {steamid}{personaname,realname,mail,avatar}
//      OUT {error,mensaje} || {jugador{steamid,personaname,realname,mail,avatar}}
router.put('/:steamid', function(req, res){
  Player.findOneAnd({"steamid": req.params.steamid}, function (err, player) {
    if (err) return handleError(err);
    if (req.body.personaname) player.personaname = req.body.personaname;
    if (req.body.realname) player.realname = req.body.realname;
    if (req.body.mail) player.mail = req.body.mail;
    if (req.body.avatar) player.avatar = req.body.avatar;
    if (req.body.loccountrycode) player.loccountrycode = req.body.loccountrycode;
    player.save(function (err) {
      if(err) return res.json(JSON.stringify({"error": true, "mensaje": "No se pudo actualizar la información"},null,4));
      return res.json(JSON.stringify({"mensaje": "Información de jugador actualizada.","player":player},null,4));
    });
  });
});
// 1.c  player updateOrCreateIfNotExist
//      Actualizamos el player con su (steamid)
//      IN {steamid}{personaname,realname,mail,avatar}
//      OUT {error,mensaje} || {jugador{steamid,personaname,realname,mail,avatar}}
router.post('/updateOrCreateIfNotExist', function(req, res){
  console.log(req);
  Player.findOneAndUpdate(
    //Query
    {
      "steamid": req.body.steamid
    },
    //Update
    {
      account_id: req.body.steamid ,
      personaname: req.body.personaname,
      realname: req.body.realname,
      avatar: req.body.avatar
    },
    //Options
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    },function(err, result){
      if(err) return res.json(JSON.stringify({"error": true, "mensaje": err},null,4));
      return res.json(JSON.stringify({"mensaje": "Hecho"},null,4));
    // do something with the document)

    });
});
// 1.d  player DELETE
//      Eliminamos un usuario por su (steamid), eliminamos el row completo
//      IN {steamid}
//      OUT {error,mensaje} || {mensaje}
router.delete('/:steamid', function(req, res){
  Player.remove({
      steamid: req.params.steamid
  }, function(err, nave) {
      if (err) res.json(JSON.stringify({"error": true, "mensaje":err},null,4));
      res.json(JSON.stringify({"mensaje":"Player eliminado"},null,4));
  });
});

module.exports = router;
