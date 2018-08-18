const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = (req, res, next)=> {
  if (!req.body.token){
    res.status(403).json({message: 'not authorized'})
  } else {
    let loggedInUser = jwt.verify(req.body.token, process.env.secretKey);

    User.findById(loggedInUser._id)
    .then(user => {
      if (!user){
        res.status(404).json({message: 'user is not registered'})
      } else {
        return loggedInUser
      }
    })
    .catch(err => {
      res.status(500).json({message: err})
    })
  }
}
module.exports = auth
