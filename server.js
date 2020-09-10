// Requiring necessary npm packages
const express = require("express");
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const session = require("express-session");
// Requiring passport as allready configured before
// ===========================================================
// For use passport-local => require("./config/passport");
// For use passport-basic => require("./config/passportbasic");
const passport = require("./config/passportbasic");
//
// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 10000;
const db = require("./models");
//
// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
//
// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
//
// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function () {
  console.log('Database successfully connected');
}).catch(function (err) {
  console.log(err, 'Ops, Database failed to connect!');
});

app.listen(PORT, function() {
  console.log("======================================================================================");
  console.log("                           AUTAN DEMO (Express JS With Passport JS)                   ");
  console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser. 🌎 <==", PORT, PORT);
  console.log("                                                                                      ");
  console.log("======================================================================================");
});


