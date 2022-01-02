const express = require('express');
const passport = require('passport');

const router = express.Router();
const homeController = require('../controllers/home_controllers');

router.get('/', homeController.home);
router.get('/aadesh', homeController.aadesh);
router.use('/user', require('./user'));
router.use('/edit', require('./edit'));
router.use('/posts', require('./posts'));
// action route for Comment
router.use('/comments', require('./comments'));

// action route for likes
router.use('/likes', require('./likes'));

//action route for Friends
router.use('/friends', require('./friends'));
// for api
router.use('/api', require('./api'));

module.exports = router;