const axios = require('axios');
const mongoose = require('mongoose');

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/mongoSearchify';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

var db = mongoose.connection;

db.once('open', function() {
  console.log('Mongoose Connection Succesful');
});

var Song = require('../models/song.js');
var User = require('../models/user.js');

module.exports.checkUser = (req, res) => {
  User.find({ userID: req.body.userID }, function(err, docs) {
    if (docs.length) {
      console.log('User Exists');
    } else {
      User.create(req.body);
    }
  });
};