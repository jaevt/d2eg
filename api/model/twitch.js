//
// Module dependencies
//
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var connection = mongoose.createConnection('mongodb://localhost:27017/test');
var TwitchSchema   = new Schema({
  foo: String
});
module.exports = connection.model('Twitch', TwitchSchema);
