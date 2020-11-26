const express = require('express');
const router = express.Router();

const commentaireCtrl = require('../controllers/commentaire');

//Routes
router.post('/:messageId/comment/new', commentaireCtrl.createCommentaire);
//router.get('/:messageId/comment', commentaireCtrl.listCommentaire);


module.exports = router;