//Imports
const express = require('express');
const router = express.Router();

const multer = require('../middleware/mutler-config');
const userCtrl = require('../controllers/user');

//Routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profile/me', userCtrl.getUserProfile);
router.put('/profile/me', multer, userCtrl.updateUserProfile);
router.delete('/profile/me', userCtrl.deleteUserProfile);
router.get('/user/:id', userCtrl.getUserInfos);

module.exports = router;