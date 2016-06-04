//
// Module dependencies
//
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var League = require('./model/league');

router.post('/', function(req, res){
  var league = new League;
  league.title = req.body.league.title;
  league.description = req.body.league.description;
  league.avatar = req.body.league.avatar;
  league.rules = req.body.league.rules;
  league.admin = req.body.admin;
  league.save(function(err){
    if(err) return res.json({"error": true, "mensaje": "Error al crear competicion", err});
    return res.json({"mensaje":"Competicion creada con exito"});
  });
});

router.delete('/:_id', function(req, res){
  League.findByIdAndRemove(req.params._id, function(err){
    if(err) return res.json({"error": true, err});
    return res.json({"mensaje": "Competencia eliminada"});
  });
});

router.get('/', function(req, res){
  League.find({}, function(err,leagues){
    if(err) return res.json({"error": true, err});
    return res.json({"mensaje": "Busqueda correcta", "leagues":leagues});
  });
});

router.post('/battlefy/:_id', function(req, res){
  League.findByIdAndUpdate(req.params._id,
  {
    "battlefy":{
      cuadros: req.body.cuadros ,
      clasificados: req.body.clasificados,
      participantes: req.body.participantes,
      join_button: req.body.join_button
    }
  },{ upsert: true, new: true, setDefaultsOnInsert: true },function(err, result){
    if(err) return res.json({"error": true, "mensaje": err});
    return res.json({"mensaje": "Hecho"});
  });
});

router.delete('/battlefy/:_id', function(req, res){
  League.findByIdAndUpdate(req.params._id,
  {
    "battlefy": null
  },{ upsert: true, new: true, setDefaultsOnInsert: true },function(err, result){
    if(err) return res.json({"error": true, "mensaje": err});
    return res.json({"mensaje": "Hecho"});
  });
});

router.get('/:_id', function(req, res){
  League.findById( req.params._id, function(err,league){
    if(err) return res.json({"error": true, "mensaje": "Error buscar torneo", err});
    return res.json({"mensaje": "Liga encontrada","league": league});
  });
});

router.put('/:_id', function(req, res){
  League.findByIdAndUpdate( req.params._id,{
    title: req.body.title,
    description: req.body.description,
    avatar: req.body.avatar,
    rules: req.body.rules
  }, function(err,league){
    console.log("ESTAS EN EL EDIT DE LA API");
    if(err) return res.json({"error": true, "mensaje": "Error al editar competicion", err});
    return res.json({"mensaje": "Liga encontrada","updated": league});
  });
});



module.exports = router;
