const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controllers');

router.get('/', homeController.home);
router.get('/aadesh', homeController.aadesh);

module.exports = router;