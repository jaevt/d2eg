//
// Module dependencies
//
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Article = require('./model/article');

router.post('/', function(req, res){
  var article = new Article;
  article.title = req.body.article.title;
  article.body = req.body.article.body;
  article.avatar = req.body.article.avatar;
  article.admin = req.body.admin;
  article.save(function(err){
    if(err) return res.json({"error": true, "mensaje": "Error al crear articulo", err});
    return res.json({"mensaje":"Articulo creado con exito"});
  });
});

router.put('/:_id', function(req, res){
  Article.findByIdAndUptade(req.params._id,{
    title : req.body.title,
    body : req.body.body,
    avatar : req.body.avatar,
    editedAt : Date.now()
    },{ upsert: true, new: true, setDefaultsOnInsert: true }function(err,article){
    if(err) return res.json({"error": true,"mensaje": "Error al editar este articulo", err});
    return res.json({"mensaje": "Artículo modificado"});
  });
});

router.get('/:_id', function(req, res){
  Article.findById(req.params._id, function(err,article){
    if(err) return res.json({"error": true,"mensaje": "Error al buscar este articulo", err});
    return res.json({"mensaje": "Artículo encontrado", "article": article});
  });
});

router.get('/', function(req, res){
  Article.find({}, function(err,articles){
    if(err) return res.json({"error": true,"mensaje": "Error al buscar articulos", err});
    return res.json({"mensaje": "Busqueda correcta de articulos", "articles": articles});
  });
});

router.delete('/:_id', function(req, res){
  Article.findByIdAndRemove(req.params._id, function(err) {
      if (err) return res.json({"error": true, "mensaje": "Error al eliminar articulo",err});
      return res.json({"mensaje":"Articulo eliminado con exito"});
  });
});

module.exports = router;
