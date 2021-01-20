const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/like');
const auth = require ('../middleware/auth');

//Routes
router.post('/messages/:messageId/vote/like', auth, likeCtrl.likePost);
router.post ('/messages/:messageId/vote/dislike', auth, likeCtrl.dislikePost);

module.exports = router;