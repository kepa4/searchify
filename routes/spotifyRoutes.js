const express = require('express');
const axios = require('axios');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');
const spotify = require('../controllers/spotify');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const redirect_uri =
  process.env.REDIRECT_URI || 'http://localhost:3000/callback';

const spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri
});

router.get('/genres', function(req, res) {
  spotify.getGenres(req, res);
});

router.get('/songs', function(req, res) {
  spotify.getSongs(req, res);
});

module.exports = router;
