const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.register);
router.post('/login', userCtrl.login);

module.exports = router;