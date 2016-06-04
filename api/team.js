var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Team = require('./model/team');
var Player = require('./model/player');
var connection = mongoose.createConnection('mongodb://localhost:27017/test');

router.post('/', function(req, res){
  var team = new Team;
  team.game = req.body.game;
  team.name = req.body.name;
  team.pass = req.body.pass;
  team.country = req.body.country;
  team.avatar = req.body.avatar;
  team.description = req.body.description;
  team.save(function(err){
    if(err)return res.json({"error": true,"mensaje": "No se pudo crear el equipo"});
    return res.json({"mensaje": "Team creado con exito!"});
  });
});
// ADD PLAYER TO TEAM
router.post('/:teamObjectID',function(req,res){
  Team.findOneAndUpdate(
    //  query
    {
      "_id": req.params.teamObjectID
    },
    //Update
    {
      $push:{
        players:req.body.playerObjectID
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
  )
});

router.get("/TODO", function(req, res) {
  console.log("ALGO PASA AQUI")
    Team.find({},function(err, teams){
      Player.populate(teams, {path: "players"},function(err, teams){
        console.log("TADA");
        if (err) return res.json({"error": true, "mensaje": err});
        console.log(teams);
            res.json(teams);
      });

    });
});

router.get('/:objectID', function(req, res){
  Team.findOne({"_id": req.params.objectID},function(err,team){
    if(err) return res.json(JSON.stringify({"error": true, "mensaje": err},null,4));
    return res.json(JSON.stringify(team,null,4));
  });
});



module.exports = router;
