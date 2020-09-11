const passport = require("passport");
const db = require('../models');
const bcrypt = require("bcrypt-nodejs");

const isValidEmail = require('../helper/email_validator');

exports.signup = (req, res) => {
    let { email, password } = req.body

    if (!isValidEmail(email)) {
        res.status(400).json({ success: false, message: "Please enter a valid email address." });
    }

    db.User.findOne({where:{ email: req.body.email }})
        .then(userData => {
            // console.log({request: req.body});

            if (userData) {
                res.status(400).json({ success: false, message: "That email is already in used." });
            }
            else {
            db.User.create({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
              }).then(() => {
                res.status(201).json({ success: true, message: "Account successfully created." });
                // res.redirect("/signin");
            })
            .catch(err => {
                res.status(500).json({ success: false, message: "Internal Server Error : Unable to create account!" });
            })
        }
                
        })
}

exports.signin = function (req, res) {
    let { username } = req.body.email;

        res.status(200).json({ success: true, user: `${ req.body.email }`, isAuthenticated: true });
    
}

exports.status = (req, res) => {
    let { username } = req.user;
    res.status(200).json({ success:true, user: `${ username }`, isAuthenticated: true });
}

exports.logout = (req, res) => {
    req.logout();
    res.status(200).json({ success: true, message: "Successfully logged out" })

}

exports.dashboard = (req, res) => {
    console.log({request: res.body});
    // res.render('members');
}

exports.user_data = (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  }