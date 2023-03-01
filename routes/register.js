var express = require('express');
var router = express.Router();

//we bring the User model from models
const User = require('../models/User')

//bringing bcrypt for passowrd
const bcrypt = require('bcryptjs');

/* GET registration page. */
router.get('/', function(req, res, next) {
  res.render('register', {page:'Register', menuId:'register'});
});

//Handle registration post request from the form
router.post('/', (req, res) => {
 //destructuring  from form body
 const { name, email, password, password2 } = req.body;

//we do validaiton checks below
let errors = [];

//check if everyhting filled
if (!name || !email || !password || !password2) {
  errors.push({ msg: "Fill in all fields"})
}

//check if pass1 and pass2 matches
if (password !== password2) {
  errors.push({ msg: "Pass don't match" })
} 

//what to do with error array we have in place 

// if theres any error we load back register page
if (errors.length > 0 ) {
  res.render('register', {page:'Register', menuId:'register'})
} else {
  //if no error we go on with database dump
  
  //but before we post this new user we want to check if an user already exists with these credentials
  //we use mongoose findOne method using email variable from the registration form
  User.findOne({ email: email })
    .then(user => {
      if(user) {
        //if findOne finds the user we rerender registration page
        res.render('register', {page:'Register', menuId:'register'})
      } else {
        
        //else if this user is unique

        //We initialize newUser as User from our model
        const newUser = new User ({
          name, 
          email,
          password
        });

        //check to see if we get the newUser -- console will add extra _id as mongodb does it automatically
        console.log(newUser)
        
        //now we will use bcrypt to encrypt password - using documentation example
        //we provide the current plain password and pass salt, we get back hashed password or an error if theres one
        bcrypt.genSalt(10, (err, salt) => 
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            //we change the password in newUser model to the hash
            newUser.password = hash;
            //save User which gives us a promise, so we handle error with console err
            newUser.save()
            .then(user => {
              //if successfully we redirect to login page as registration is completed
              console.log(newUser);
              res.redirect('/login');
            })
            .catch(err => console.log(err))
        }))

      }
    })
}

})


module.exports = router;