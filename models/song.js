var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SongSchema = new Schema({
  artists: [String],
  explicit: Boolean,
  name: String,
  id: String,
  previewUrl: String,
  img: String
});

var Song = mongoose.model('Song', SongSchema);