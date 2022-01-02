const express = require('express');
const router = express.Router();

const friendController = require('../controllers/friendship_controller');

router.get('/add-friend/:id', friendController.addFriend);

router.get('/remove-friend/:id', friendController.removeFriend);



module.exports = router;