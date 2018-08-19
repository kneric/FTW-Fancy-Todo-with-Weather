const express = require('express');
const router = express.Router();
const {signin, signup, loginFB, decodeJWT} = require('../controllers/index')

router
  .post('/signup', signup)
  .post('/signin', signin)
  .post('/loginfb', loginFB)
  .post('/decode', decodeJWT)

module.exports = router;