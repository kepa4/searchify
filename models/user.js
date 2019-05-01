var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userID: {
    type: String,
    required: true
  },
  savedSongs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Song'
    }
  ]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;