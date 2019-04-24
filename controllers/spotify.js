require('dotenv').config();

var SpotifyWebApi = require('spotify-web-api-node');
var querystring = require('querystring');

var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var axios = require('axios');

const REDIRECT_URI =
  process.env.REDIRECT_URI || 'http://localhost:3000/callback';
const STATE_KEY = 'spotify_auth_state';

const scopes = ['user-read-private', 'user-read-email'];

const spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: REDIRECT_URI
});

module.exports.spotifyLogin = function(res) {
  const state = generateRandomString(16);
  res.cookie(STATE_KEY, state);
  res.send(spotifyApi.createAuthorizeURL(scopes, state));
};

module.exports.spotifyCallback = function(req, res) {
  spotifyApi.authorizationCodeGrant(req.query.code).then(function(data) {
    spotifyApi.setAccessToken(data.body.access_token);
    spotifyApi.setRefreshToken(data.body.refresh_token);
    res.send(data);
  });
};

function generateRandomString(length) {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}