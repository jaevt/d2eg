var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Player       = require('./player');
var connection = mongoose.createConnection('mongodb://localhost:27017/test');
var TeamSchema   = new Schema({
  steamid: String,
  pass: String,
  name: String,
  avatar: String,
  country: String,
  win:{
    type: Number,
    default: 0
  },
  lose:{
    type: Number,
    default: 0
  },
  social: {
    type:[{
      title: String,
      url: String,
      icon: String
    }],
    default:null
  },
  streams:{
    type:[{
      title: String,
      url: String,
      icon: String
    }],
  default:null},
  description: String,
  players: [
    {
      type: Schema.ObjectId,
      ref: "Player"
    }
  ]
});

module.exports = connection.model('Team', TeamSchema);
