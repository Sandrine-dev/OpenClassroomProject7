//Imports
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

//Routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profile/me', userCtrl.getUserProfile);
//router.put('/profile/me', userCtrl.updateUserProfile);

module.exports = router;