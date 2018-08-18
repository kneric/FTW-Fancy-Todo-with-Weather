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
          let token = jwt.sign({_id: user._id}, process.env.secretKey)
          res.status(200).json({token, message:'Signed in succesfully'})
        } else {
          res.status(403).json({message:'Username / password is incorrect'})
        }
      })
    } else {
      res.status(404).json({message: 'User not found'});
    }
  })
  .catch(err => {
    res.status(500).json({message: err});
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
        let token = jwt.sign({_id: createdUser._id}, process.env.secretKey)
        res.status(201).json({
          token: token, 
          message: 'user created'
        })
      })
    } else {
      res.status(400).json({message: 'email already used'})
    }
  })
  .catch(err=> {
    res.status(500).json({message: err})
  })
}

const loginFB = (req, res) =>{
  let authResponse = req.body;
  let url = `https://graph.facebook.com/me?fields=id,name,email&access_token=${authResponse.accessToken}`;
  
  axios.get(url)
  .then(response => {
    // need testing
    console.log(response);
    let userFB = JSON.parse(response);

    User.findOne({email: userFB.email})
    .then(userOnDb => {

      if(!userOnDb){
        return User.create({
          idFB: userFB.id,
          name: userFB.name,
          email: userFB.email,
        })
        .then(createdUser=> {
          let token = jwt.sign({_id: createdUser._id}, process.env.secretKey)
          res.status(201).json({
            token, 
            message: 'user created'
          })
        })
      } else {
        let token = jwt.sign({_id: userOnDb._id}, process.env.secretKey)
        res.status(200).json({
          token,
          message: 'login with FB success'
        })
      }
    })
  })
  .catch(err => {
    res.status(500).json({message: err})
  })

}

module.exports = {
  signin,
  signup,
  loginFB
};
