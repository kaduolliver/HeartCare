const express = require('express');
const router = express.Router();
const consultasController = require('../controllers/consultasController');

// Agendar consulta
router.post('/agendar', consultasController.agendarConsulta);

// Consultas do usuário
router.get('/', consultasController.getConsultas);

// Cancelar consulta
router.delete('/:id', consultasController.cancelarConsulta);

module.exports = router;
