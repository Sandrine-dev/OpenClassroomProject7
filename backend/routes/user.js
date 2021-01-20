//Imports
const express = require('express');
const router = express.Router();

const multer = require('../middleware/mutler-config');
const auth = require ('../middleware/auth');
const userCtrl = require('../controllers/user');

//Routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profile/me',auth, userCtrl.getUserProfile);
router.put('/profile/me', auth, multer, userCtrl.updateUserProfile);
router.delete('/profile/me', auth, userCtrl.deleteUserProfile);

module.exports = router;