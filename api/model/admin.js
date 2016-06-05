var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var connection = mongoose.createConnection('mongodb://localhost:27017/test');
var AdminSchema   = new Schema({
  user_id: {type: String, unique: true},
  email: {type: String, unique: true},
  country: String,
  nickname: String,
  realname: {type:String,default:null},
  avatar: {type:String, default:"http://i.imgur.com/QI9AeTc.png"}
});
module.exports = connection.model('Admin', AdminSchema);
