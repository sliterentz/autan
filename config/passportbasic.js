//import passport packages required for authentication
const passport = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy;

//We will need the models folder to check passport against
var db = require("../models");

// Telling passport we want to use a Basic Strategy. In other words, we want login with a username/email and password
passport.use(new BasicStrategy(
  {
    usernameField: "email"
  },
  function (email, password, done) {
    db.User.findOne(
      {
        where: {
          email: email
        }
      }).then(function (err, dbUser) {
        // If there's error
        if (err) { 
          return done(err); 
        }
        // If there's no user with the given email
        else if (!dbUser) {
          return done(null, false);
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
                      message: "Incorrect password."
                    });
        }
        // If none of the above, return the user
        return done(null, dbUser);
      });
  }
));

  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
  
  // Exporting our configured passport
  module.exports = passport;