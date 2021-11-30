const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller');



router.get('/profile',passport.checkAuthentication,passport.setAuthenticatedUser, userController.profile);

// SignUp Route
router.get('/sign-up',passport.checkUnauthentication, userController.signup);

// SignIn Route
router.get('/sign-in',passport.checkUnauthentication, userController.signin);

// create a user
router.post('/create', userController.create);

// session creation
// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'},
), userController.createSession);


// sign-out
router.get('/sign-out', userController.destroySession);

module.exports = router;