var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var connection = mongoose.createConnection('mongodb://localhost:27017/d2eg');
var crypto = require('crypto');
var algorithm = 'aes-256-ctr';

var AdminSchema   = new Schema({
  steamid: {type: String, unique: true},
  email: {type: String, unique: true},
  password: String,
  token: String,
  country: String,
  nickname: String,
  realname: String,
  avatar: {type:String, default:"http://i.imgur.com/QI9AeTc.png"}
});

AdminSchema.methods.comparePasswords = function (pass,cb){
  if (this.password === pass) {
    return cb(true);
  } else {
    return cb(false);
  }
};
module.exports = connection.model('Admin', AdminSchema);
