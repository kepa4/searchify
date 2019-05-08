require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');
const qs = require('querystring');
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const axios = require('axios');
const REDIRECT_URI =
  process.env.REDIRECT_URI || 'http://localhost:3000/callback';
const STATE_KEY = 'spotify_auth_state';
const scopes = ['user-read-private', 'user-read-email'];
const mongoose = require('mongoose');
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/mongoSearchify';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

db.once('open', function() {
  console.log('Mongoose Connection Succesful');
});

const Song = require('../models/song.js');
const User = require('../models/user.js');

const spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: REDIRECT_URI
});

const redirectUriParameters = {
  client_id: process.env.CLIENT_ID,
  response_type: 'token',
  scope: scopes.join(' '),
  redirect_uri: encodeURI(REDIRECT_URI),
  show_dialog: true
};

const reAuthenticateOnFailure = action => {
  action(() => {
    authenticate(action);
  });
};

function authenticate(callback) {
  spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);

      callback instanceof Function && callback();
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
      console.log(
        'Something went wrong when retrieving an access token',
        err.message
      );
    }
  );
}
authenticate();

module.exports.spotifyLogin = function(res) {
  const redirectUri = `https://accounts.spotify.com/authorize?${qs.stringify(
    redirectUriParameters
  )}`;
  res.send(redirectUri);
};

module.exports.getGenres = function(request, response) {
  spotifyApi.setAccessToken(request.query.accessToken);
  reAuthenticateOnFailure(failure => {
    spotifyApi.getAvailableGenreSeeds().then(function(data) {
      response.send(data.body);
    }, failure);
  });
};

module.exports.getSongs = function(request, response) {
  reAuthenticateOnFailure(failure => {
    spotifyApi
      .searchTracks(request.query.searchQuery, {
        limit: 50,
        offset: 50 + parseInt(request.query.offsetNumber)
      })
      .then(data => {
        response.send(data);
      }, failure);
  });
};

module.exports.getMe = function(req, res) {
  spotifyApi
    .getMe()
    .then(data => {
      User.find({ userID: data.body.id }, function(err, docs) {
        if (!docs.length) {
          User.create({ userID: data.body.id });
        }
      });
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.saveSong = function(req, res) {
  console.log(req.body);
  Song.create(req.body)
    .then(function(dbSong) {
      return User.findOneAndUpdate(
        { userID: req.params.id },
        { $push: { savedSongs: dbSong } },
        { new: true }
      );
    })
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    });
};

module.exports.getSavedSongs = function(req, res) {
  User.findOne({ userID: req.params.id })
    .populate('savedSongs')
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    });
};

module.exports.deleteSong = function(req, res) {
  Song.find({ _id: req.body._id })
    .deleteOne()
    .exec()
    .then(res.send('success'));
};