const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/like');

//Routes
router.post('/messages/:messageId/vote/like', likeCtrl.likePost);
router.post ('/messages/:messageId/vote/dislike', likeCtrl.dislikePost);

module.exports = router;