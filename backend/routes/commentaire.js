const express = require('express');
const router = express.Router();

const commentaireCtrl = require('../controllers/commentaire');
const auth = require ('../middleware/auth');

//Routes
router.post('/:messageId/comment/new', auth, commentaireCtrl.createCommentaire);
router.get('/:messageId/comment', auth, commentaireCtrl.listCommentaire);


module.exports = router;