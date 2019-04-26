require('dotenv').config();

var SpotifyWebApi = require('spotify-web-api-node');
var qs = require('querystring');

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
  console.log(redirectUri);
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