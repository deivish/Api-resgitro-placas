const express = require('express');
const { obtenerRegistros, crearRegistro, actualizarSalida, eliminarRegistro } = require('../controllers/registroController');

const router = express.Router();

router.get('/', obtenerRegistros);
router.post('/', crearRegistro);
router.put('/:id', actualizarSalida);
router.delete('/:id', eliminarRegistro);

module.exports = router;
