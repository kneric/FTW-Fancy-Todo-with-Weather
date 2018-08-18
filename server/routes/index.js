const express = require('express');
const router = express.Router();
const {signin, signup, loginFB} = require('../controllers/index')

router
  .post('/signup', signup)
  .post('/signin', signin)
  .post('/loginfb', loginFB)

module.exports = router;