//Imports
const express = require('express');
const router = express.Router();

const messageCtrl = require('../controllers/message');
const multer = require('../middleware/mutler-config');
const auth = require ('../middleware/auth');

//Routes
router.post('/messages/new',auth, multer, messageCtrl.createMessage);
router.get('/messages', auth, messageCtrl.listMessages);
router.delete('/messages', auth , messageCtrl.deleteMessage);


module.exports = router;