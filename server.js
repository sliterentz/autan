// Requiring necessary npm packages
const express = require("express");
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const session = require("express-session");
require("dotenv").config();
// Requiring passport as allready configured before
// ===========================================================
// For use passport-local => require("./config/passport");
// For use passport-basic => require("./config/passportbasic");
const passport = require("passport");

//
// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 10000;
const db = require("./models");
//
// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "TADAOk1", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//
// Requiring our routes
const appRouter = require('./routes/index');

app.use('/api/autan', appRouter)
require("./routes/html-routes")(app);
// require("./lib/passport/strategies/passport_local")(app);
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


