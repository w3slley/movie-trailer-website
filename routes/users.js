const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

let User = require('../models/User.js')

//Login process
router.post('/login', function (req, res) {
  console.log(req.body.email, req.body.password)
  if(req.body.email != undefined && req.body.password != undefined){
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) console.error(err);
      if (!user) {
        res.send({'status':'failed','message':'Invalid information'});
      }
      else{
        bcrypt.compare(req.body.password, user.password, (err, valid) => {
          if (err) console.error(err);
          console.log(valid);
          if (valid) {
            res.send({'status':'success', 'user': {'id': user._id, 'name':user.name,'email':user.email,'username':user.username}});
          }
          else {
            res.send({'status':'failed','message':'Invalid Information'});
          }
        });
      }
    });
  }
});



//Logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
});
//Register process
router.post('/register', (req, res) => {
  let name = req.body.name
  let email = req.body.email
  let username = req.body.username
  let password = req.body.password
  let confirmPassword = req.body.confirmPassword
  
  bcrypt.hash(password, 10, (err, hash) => {//Hashing password
    let newUser = new User({ name: name, email: email, username: username, password: hash });
    newUser.save((err) => {
      if (err) return console.error(err);
    })

    res.send({'status':'success'});
  });
});

module.exports = router