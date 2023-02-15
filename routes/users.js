// { username: bro, password: bro }
// { username: tim, password: tim }
// { username: max, password: max }
// { username: dan, password: dan }
// { username: sam, password: sam }

const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users')


router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', failureMessage: true, keepSessionInfo: true }), users.login);

router.get('/logout', users.logout);



module.exports = router;