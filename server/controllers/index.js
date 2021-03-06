const User = require('../models/user');
const jwt = require ('jsonwebtoken');
const axios = require('axios');

const signin = (req, res) => {
  const {email, password} = req.body;

  User.findOne({email})
  .then (user => {
    if (user){
      user.checkPwd(password, (isMatched)=> {
        if(isMatched){
          let token = jwt.sign({
            _id: user._id, 
            name: user.name
          }, process.env.secretKey)
          res.status(200).json({
            token, 
            message:'Signed in succesfully'
          })
        } else {
          res.status(403).json({message:'email / password is incorrect'})
        }
      })
    } else {
      res.status(404).json({message: 'User not found'});
    }
  })
  .catch(err => {
    res.status(500).json({message: err.message});
  })
}

const signup = (req, res) => {
  const {name, email, password} = req.body;

  User.findOne({email})
  .then(user => {
    if(!user){
      return User.create({
        name,
        email,
        password
      })
      .then(createdUser=> {
        let token = jwt.sign({
          _id: createdUser._id,
          name: createdUser.name
        }, process.env.secretKey)
        res.status(201).json({
          token: token, 
          message: 'user created'
        })
      })
    } else {
      res.status(400).send('email already used')
    }
  })
  .catch(err=> {
    res.status(400).send(err.message);
  })
}

const loginFB = (req, res) =>{
  let authResponse = req.body;
  let url = `https://graph.facebook.com/me?fields=id,name,email&access_token=${authResponse.accessToken}`;
  
  axios.get(url)
  .then(response => {
    let userFB = (response.data);

    User.findOne({email: userFB.email})
    .then(userOnDb => {

      if(!userOnDb){
        return User.create({
          idFB: userFB.id,
          name: userFB.name,
          email: userFB.email,
          password: process.env.password
        })
        .then(createdUser=> {
          let token = jwt.sign({
            _id: createdUser._id,
            name: createdUser.name,
          }, process.env.secretKey)
          res.status(201).json({
            token, 
            message: 'user created'
          })
        })
      } else {
        let token = jwt.sign({
          _id: userOnDb._id,
          name: userOnDb.name
        }, process.env.secretKey)
        res.status(200).json({
          token,
          message: 'login with FB success'
        })
      }
    })
  })
  .catch(err => {
    res.status(400).send(err.message);
  })
}

const decodeJWT = (req, res) => {
  let loggedInUser = jwt.verify(req.body.token, process.env.secretKey);
  res.status(200).json(loggedInUser);
}

module.exports = {
  signin,
  signup,
  loginFB,
  decodeJWT
};
