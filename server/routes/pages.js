const express = require('express');
const router = express.Router();
const path = require('path');

// Middleware de autenticação
function protegerRota(req, res, next) {
    if (!req.session.usuario) return res.redirect('/login');
    next();
}

// Rotas públicas
router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../../client/index.html')));
router.get('/about', (req, res) => res.sendFile(path.join(__dirname, '../../client/pages/about.html')));
router.get('/contact', (req, res) => res.sendFile(path.join(__dirname, '../../client/pages/contact.html')));
router.get('/login', (req, res) => res.sendFile(path.join(__dirname, '../../client/pages/login.html')));
router.get('/register', (req, res) => res.sendFile(path.join(__dirname, '../../client/pages/register.html')));
router.get('/service', (req, res) => res.sendFile(path.join(__dirname, '../../client/pages/service.html')));

// Rota protegida
router.get('/user', protegerRota, (req, res) => res.sendFile(path.join(__dirname, '../../client/pages/user.html')));

module.exports = router;
