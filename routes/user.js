const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller');



router.get('/profile/:id',passport.checkAuthentication,passport.setAuthenticatedUser, userController.profile);

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

// update user data
router.post('/update/:id', passport.checkAuthentication, userController.update);

// sign-out
router.get('/sign-out', userController.destroySession);


// Google Sign-IN routers
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/user/sign-in'}), userController.createSession);

module.exports = router;