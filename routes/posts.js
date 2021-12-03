const express = require('express');

const router = express.Router();
const postController = require('../controllers/post_controller');

const passport = require('passport');

// action router for creating post
router.post('/create',passport.checkAuthentication ,postController.createPost);
router.get('/destroy/:id', passport.checkAuthentication, postController.destroy);


module.exports = router;