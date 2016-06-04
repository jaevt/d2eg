var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Team       = mongoose.model('./team');
var Player       = mongoose.model('./player');
var League      = mongoose.model('./league');
var connection = mongoose.createConnection('mongodb://localhost:27017/test');

var MatchSchema   = new Schema({
  _id: Schema.ObjectId,
  match_id: {type: String, unique: true},
  date: Number,
  league: { type: Schema.ObjectId, ref: "League" },
  radiantwin: {type:boolean},
  radiant:{
    team: {type: Schema.ObjectId, ref: "Team" },
    players:[{
      account_id:{ type: Number, ref: "Player" }
      k: Number,
      d: Number,
      a: Number,
      gpm: Number,
      expm: Number,
      lh: Number,
      deny: Number
    }]
  }

});

module.exports = connection.model('Match', MatchSchema);
