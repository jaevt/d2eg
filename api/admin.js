var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Admin = require('./model/admin');

router.post('/',function(req,res){
  var admin = new Admin;
  admin.user_id = req.body.user_id;
  admin.email = req.body.email;
  admin.country = req.body.country;
  admin.nickname = req.body.nickname;
  admin.save(function(err){
    if(err) return res.json({"error": true, "mensaje": "No se pudo crear administrador",err});
    return res.json({"mensaje":"Administrador creado","admin":admin});
  });
});

router.get('/:_id',function(req,res){
  Admin.findOne({user_id: req.params._id},function(err,admin){
    if(err) return res.json({"error": true, "mensaje": "No se pudo acceder a los datos del Administrador",err});
    return res.json({"mensaje": "Administrador encontrado" , "admin": admin});
  });
});

router.put('/:_id',function(req,res){
  Admin.findByIdAndUpdate(req.params._id,{
    steamid: req.body.steamid,
    account_id: req.body.account_id,
    personaname: req.body.personaname,
    realname: req.body.realname,
    avatar: req.body.avatar
  },function(err,admin){
    if(err) return res.json({"error":true,"mensaje":"No se pudo editar el usuario",err});
    return res.json({"mensaje": "Cuenta editada con exito", "admin":admin});
  });
});



module.exports = router;
