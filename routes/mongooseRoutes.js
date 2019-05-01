const express = require('express');
const axios = require('axios');
const router = express.Router();
const mongoose = require('../controllers/mongoose');

router.post('/checkUser', (req, res) => {
  console.log(req.data);
  mongoose.checkUser(req, res);
});

router.post('/songs', (req, res) => {});

router.get('/savedSongs', (req, res) => {});

router.delete('/songs/:id', (req, res) => {});

module.exports = router;
