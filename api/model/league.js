//
// Module dependencies
//
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var connection = mongoose.createConnection('mongodb://localhost:27017/test');
var Admin       = require('./admin');
var LeagueSchema   = new Schema({
  title: String,
  description: String,
  rules: String,
  avatar: String,
  createdAt: {type:Date, default:Date.now()},
  editedAt: {type:Date, default:Date.now()},
  eventDate: {type:Date, default:Date.now()},
  streams:{
    type:[{
      title: String,
      url: String,
      icon: String,
    }]
    ,default: null
  },
  battlefy:{
    type:{
      cuadros: String,
      clasificados: String,
      participantes: String,
      join_button: String
    },
    default: null
  },
  admin:{
    type: Schema.ObjectId,
    ref: "Admin"
  }
});

module.exports = connection.model('League', LeagueSchema);
