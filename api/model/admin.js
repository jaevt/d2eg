var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var connection = mongoose.createConnection('mongodb://localhost:27017/test');
var AdminSchema   = new Schema({
  mail: {type: String, unique: true},
  pass: String,
  steamid: {type: String, unique: true},
  account_id: Number,
  personaname: String,
  realname: String,
  avatar: String,
  loccountrycode: String
});
module.exports = connection.model('Admin', AdminSchema);
