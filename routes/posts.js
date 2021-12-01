const express = require('express');

const router = express.Router();
const postController = require('../controllers/post_controller');

const passport = require('passport');

// action router for creating post
router.post('/create',passport.checkAuthentication ,postController.createPost);



module.exports = router;