const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');

router.get('/profile', userController.profile);

// SignUp Route
router.get('/sign-up', userController.signup);

// SignIn Route
router.get('/sign-in', userController.signin);

// create a user
router.post('/create', userController.create);

module.exports = router;