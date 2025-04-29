const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota de registro
router.post('/register', authController.registrar);

// Rota de Login
router.post('/login', authController.login);

// Rota de Logout
router.get('/logout', authController.logout);

module.exports = router;
