const express = require('express');
const router = express.Router();

const commentaireCtrl = require('../controllers/commentaire');

//Routes
router.post('/:messageId/commentaires/new', commentaireCtrl.createCommentaire);
//router.get('/messages/:messageId/commentaires', commentaireCtrl.listCommentaire);


module.exports = router;