const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registro
router.post('/register', authController.registrar);

// Login
router.post('/login', authController.login);

// Logout
router.get('/logout', authController.logout);

module.exports = router;