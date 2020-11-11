const express = require('express');
const router = express.Router();

const commentaireCtrl = require('../controllers/commentaire');

//Routes
router.post('/messages/commentaire/new', commentaireCtrl.createCommentaire);
router.get('/messages/commentaires', commentaireCtrl.listCommentaire);


module.exports = router;