//
// Module dependencies
//
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var connection = mongoose.createConnection('mongodb://localhost:27017/test');
var Admin       = require('./admin');
var ArticleSchema   = new Schema({
  title: String,
  body: String,
  avatar: String,
  createdAt: {type:Date, default:Date.now()},
  editedAt: {type:Date, default:Date.now()},
  admin:{
    type: Schema.ObjectId,
    ref: "Admin"
  }
});

module.exports = connection.model('League', LeagueSchema);
