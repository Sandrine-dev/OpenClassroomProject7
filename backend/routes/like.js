const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/like');

//Routes
router.post('/messages/:id/vote/like', likeCtrl.likePost);
router.post ('/messages/:id/vote/dislike', likeCtrl.dislikePost);

module.exports = router;