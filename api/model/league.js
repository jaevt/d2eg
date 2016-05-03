var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Team       = require('./Team');
var Player       = require('./Player');
var connection = mongoose.createConnection('mongodb://localhost:27017/test');

var LeagueSchema   = new Schema({
  _id: Schema.ObjectId,
  steamid: {type: String, unique: true},
  title: String,
  avatar: String,
  description: String,
  social: [{
    title: String,
    url: String,
    icon: String
  }],
  streams:[{
    title: String,
    url: String,
    icon: String,
    live: {type: Boolean, default: false}
  }],
  teams:[{
    team: {type: Schema.ObjectId, ref: "Team" },
    favs: {type: Number, default:0},
    players:[{
      player:{ type: Schema.ObjectId, ref: "Player" }
    }]
  }]
});

module.exports = connection.model('League', LeagueSchema);
