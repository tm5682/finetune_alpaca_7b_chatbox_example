//we set local stratety as strategy first as in documentation
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require ('mongoose');
const bcrypt = require ('bcryptjs');

//User model
const User = require('../models/User');


//from documentation passport and resource
module.exports = function(passport) {
    passport.use(
        //we use email from our User as usernameField as it always will be unique and pass email, password from user input and done as extra callback function
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

            //Check if user exists using mongoose function
            User.findOne({ email: email })
                .then(user =>  {
                    //if that user doesnt exist we return done callback with null for error, false for user and custom msg as option
                    if(!user) {
                        return done(null, false, { message: "Not registered email"})
                    }

                    //Match password - we use bcrypt again to compare the user password input against database password record
                    //the callback gives err or boolean isMatch
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        
                        //if pass matched 
                        if (isMatch)  {
                            //this time for done callback we pass error as null, user as user, 
                            return done(null, user);
                        } else {

                            //if pass doesnt match then
                            //when pass dont match we return a done callback with error as null, user as false and a custom message as option
                            return done(null, false, {message: 'Password incorrect'})
                        }
                    })

                })
                //if theres error console log it
                .catch(err => console.log(err)) 
        })
    )

    //Passport serialization and deserialization for sessions as shown in passport documentation
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
    
      passport.deserializeUser(async function(id, done) {
      
        try {
            const user = await User.findById(id);
            done(null, user);
          } catch (err) {
            done(err);
          }

      });

}