//
// Module dependencies
//
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var Team        = require('./team');
var connection = mongoose.createConnection('mongodb://localhost:27017/test');
var PlayerSchema   = new Schema({
  steamid: {type: String, unique: true},
  account_id: Number,
  personaname: String,
  realname: String,
  avatar: String,
  avatarmedium: String,
  avatarfull: String,
  loccountrycode: String,
  mail: String,
  social: {
    type:[{
      title: String,
      url: String,
      icon: String
    }],
    default:null
  },
  location: {
    type: {
      country: String,
      state: String,
      city: String
    },
    default:null
  },
  twitch:{
    type:{
      _id: Number
    },
    default:null
  },
  team: {
    type: Schema.ObjectId,
    ref: "Team"
  }
});
module.exports = connection.model('Player', PlayerSchema);
