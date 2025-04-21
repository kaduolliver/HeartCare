const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Obter dados do usu�rio
router.get('/', usuarioController.getUsuario);

// Atualizar e-mail
router.put('/email', usuarioController.atualizarEmail);

// Atualizar senha
router.put('/senha', usuarioController.atualizarSenha);

// Atualizar dados pessoais
router.put('/dados', usuarioController.atualizarDados);

module.exports = router;
