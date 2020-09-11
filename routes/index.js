const express = require('express');
const router = express.Router();

const passport = require('../lib/passport/strategies/passport_local');
const isLoggedIn = require("../config/middleware/authMiddleware");
const autanController = require('../controllers/autancontroller');

router.route('/').get(isLoggedIn, autanController.status);

// router.post('/signin', passport.authenticate('local', {
//     successRedirect: '/member',
//     failureRedirect: '/signin'
// }
// ));

router.route('/signup').post(autanController.signup);

router.route('/logout').get(autanController.logout);

router.route('/signin').post(passport.authenticate('local'),autanController.signin);

router.route('/user_data').get(autanController.user_data);

router.route('/members').get();



    // app.post('/signin', passport.authenticate('passport-local', {
    //         successRedirect: '/dashboard',
    //         failureRedirect: '/signin'
    //     }
    // ));

    module.exports = router
