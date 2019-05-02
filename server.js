const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const axios = require('axios');
const app = express();
const cookieParser = require('cookie-parser');
const spotifyController = require('./controllers/spotify');
const bodyParser = require('body-parser');
const cors = require('cors');
const spotifyRoutes = require('./routes/spotifyRoutes');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, '../client/build')));
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/login', function(req, res) {
  spotifyController.spotifyLogin(res);
});

app.get('/callback', function(req, res) {
  spotifyController.spotifyCallback(req, res);
});

app.use('/spotify', spotifyRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
