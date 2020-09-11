'use strict';

const express = require('express');
const passport = require('passport');
const router = express.Router();

require('./strategies/passport_local');
require('./strategies/passport_basic');
require('./strategies/passport_jwt');

// router.use('/passport', require('./passport'));

module.exports = router;