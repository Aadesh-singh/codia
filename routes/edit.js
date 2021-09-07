const express = require('express');
const router = express.Router();
const editController = require('../controllers/edit_controller');

router.get('/post', editController.post);


module.exports = router;