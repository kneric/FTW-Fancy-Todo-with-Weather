const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = {
  auth : (req, res, next)=> {
    if (!req.body.token){
      res.status(401).json({message: 'not authorized'})
    } else {
      let loggedInUser = jwt.verify(req.body.token, process.env.secretKey);

      User.findById(loggedInUser._id)
      .then(user => {
        if (!user){
          res.status(404).json({message: 'user is not registered'})
        } else {
          next()
        }
      })
      .catch(err => {
        res.status(500).json({message: err})
      })
    }
  }
};
