const express = require('express');
const passport = require('passport');

const router = express.Router();

const commentsController = require('../controllers/comments_controller');

// action route for Comment
router.post('/create', passport.checkAuthentication, commentsController.create);



module.exports = router;