const express = require('express');
const router = express.Router();
const consultasController = require('../controllers/consultasController');

// Rota para agendar consulta
router.post('/agendar', consultasController.agendarConsulta);

// Rota para consultas do usuário
router.get('/', consultasController.getConsultas);

// Rotas para cancelar consulta
router.delete('/:id', consultasController.cancelarConsulta);

module.exports = router;
