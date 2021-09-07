const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controllers');

router.get('/', homeController.home);
router.get('/aadesh', homeController.aadesh);
router.use('/user', require('./users'));
router.use('/edit', require('./edit'));
router.use('/posts', require('./posts'));

module.exports = router;