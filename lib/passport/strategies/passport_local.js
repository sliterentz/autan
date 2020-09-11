'use strict';

//import passport packages required for authentication
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt-nodejs");

//
//We will need the models folder to check passport against
const db = require("../../../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, done) => {
    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        email: email
      }
    }).then(dbUser => {
      // If there's no user with the given email
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }

       // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!bcrypt.compareSync(password, dbUser.password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }

      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
  done(null, user);
});


// Exporting our configured passport
module.exports = passport;
