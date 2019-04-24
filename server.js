const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const axios = require('axios');
const app = express();
const cookieParser = require('cookie-parser');
const spotifyController = require('./controllers/spotify');
// const apiRoutes = require('./routes/apiRoutes');

// Define middleware here

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/login', function(req, res, next) {
  spotifyController.spotifyLogin(res);
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
