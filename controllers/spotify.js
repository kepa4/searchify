if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
var SpotifyWebApi = require('spotify-web-api-node');
var querystring = require('querystring');

var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var redirect_uri = process.env.REDIRECT_URI;
var stateKey = 'spotify_auth_state';

module.exports.spotifyLogin = function(res) {
  var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: redirect_uri
  });
  var state = generateRandomString(16);
  res.cookie(stateKey, state);
  var scopes = ['user-read-email', ' user-read-private'];
  var authorizeURL = spotifyApi.createAuthorizeURL(scopes, null, true);
  console.log(authorizeURL);
  res.redirect(authorizeURL);
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