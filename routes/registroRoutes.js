const express = require('express');
const { obtenerRegistros, crearRegistro, actualizarSalida, eliminarRegistro } = require('../controllers/registroController');

const router = express.Router();

/**
 * @swagger
 * /api/registros:
 *   get:
 *     summary: Obtiene todos los registros de vehículos
 *     responses:
 *       200:
 *         description: Lista de registros obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   placa:
 *                     type: string
 *                     description: Placa del vehículo
 *                   tipo:
 *                     type: string
 *                     description: Tipo de vehículo (carro o moto)
 *                   horaSalida:
 *                     type: string
 *                     format: date-time
 *                     description: Hora de salida del vehículo
 *       500:
 *         description: Error al obtener los registros
 *
 *   post:
 *     summary: Crea un nuevo registro de vehículo
 *     description: Registra un vehículo con su placa y tipo (carro o moto).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - placa
 *               - tipo
 *             properties:
 *               placa:
 *                 type: string
 *                 description: Placa del vehículo.
 *                 example: "AA11"
 *               tipo:
 *                 type: string
 *                 description: Tipo de vehículo (carro o moto).
 *                 example: "moto"
 *     responses:
 *       201:
 *         description: Registro creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Registro creado exitosamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     placa:
 *                       type: string
 *                     tipo:
 *                       type: string
 *                     horaSalida:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Datos inválidos o cupos llenos.
 *       500:
 *         description: Error al crear el registro
 *
 * /api/registros/{id}:
 *   put:
 *     summary: Actualiza la hora de salida de un registro
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del registro
 *     responses:
 *       200:
 *         description: Registro actualizado exitosamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Registro no encontrado
 *       500:
 *         description: Error al actualizar el registro
 *
 *   delete:
 *     summary: Elimina un registro existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del registro
 *     responses:
 *       200:
 *         description: Registro eliminado exitosamente
 *       404:
 *         description: Registro no encontrado
 *       500:
 *         description: Error al eliminar el registro
 * */


router.get('/', obtenerRegistros);

router.post('/', crearRegistro);

router.put('/:id', actualizarSalida);

router.delete('/:id', eliminarRegistro);

module.exports = router;
