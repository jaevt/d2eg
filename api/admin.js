var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Admin = require('./model/admin');

router.post('/',function(req,res){
  var admin = new Admin;
  admin.mail = req.body.mail;
  admin.pass = req.body.pass;
  admin.realname = req.body.realname;
  admin.personaname = req.body.personaname;
  admin.save(function(err){
    if(err) return res.json({"error": true, "mensaje": "No se pudo crear administrador",err});
    return res.json({"mensaje":"Administrador creado"});
  });
});

router.get('/:_id',function(req,res){
  Admin.findById(req.params._id,function(err,admin){
    if(err) return res.json({"error": true, "mensaje": "No se pudo acceder a los datos del Administrador",err});
    return res.json({"mensaje": "Administrador encontrado" , "admin": admin});
  });
});

router.post('/login',function(req,res){
  Admin.findOne({mail:req.body.mail, pass:req.body.pass},function(err,admin){
    if(err) return res.json({"error": true, "mensaje": "No se pudo acceder a los datos del Administrador",err});
    if(admin) return res.json({"mensaje": "Contraseña correcta, se ha iniciado sesion", "admin":admin});
    if(!admin) return res.json({"error": true, "mensaje": "Contraseña o correo incorrectos"});
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
