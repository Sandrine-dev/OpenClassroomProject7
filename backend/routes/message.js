//Imports
const express = require('express');
const router = express.Router();

const messageCtrl = require('../controllers/message');

//Routes
router.post('/messages/new', messageCtrl.createMessage);
router.get('/messages', messageCtrl.listMessages);


module.exports = router;