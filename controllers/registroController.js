const mongoose = require('mongoose');
const Registro = require('../models/registerSchema');

const obtenerRegistros = async (req, res) => {
    try {
        const registros = await Registro.find();
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener registros', error });
    }
};

const crearRegistro = async (req, res) => {
    try {
        const { placa } = req.body;


        const existeRegistro = await Registro.findOne({ placa });
        if (existeRegistro) {
            return res.status(400).json({
                message: "Ya existe un registro con esta placa",
                placa: existeRegistro.placa,
            });
        }


        const nuevoRegistro = new Registro(req.body);
        const registroGuardado = await nuevoRegistro.save();

        res.status(201).json({
            message: "Registro creado con éxito",
            data: registroGuardado,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear registro",
            error: error.message,
        });
    }
};

const actualizarSalida = async (req, res) => {
    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "ID inválido",
        });
    }

    try {
        const registroActualizado = await Registro.findByIdAndUpdate(
            id,
            { horaSalida: new Date() },
            { new: true }
        );

        if (!registroActualizado) {
            return res.status(404).json({
                message: "Registro no encontrado",
            });
        }

        res.status(200).json({
            message: "Registro actualizado con éxito",
            data: registroActualizado,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar registro",
            error: error.message,
        });
    }
};

const eliminarRegistro = async (req, res) => {
    const { id } = req.params;

    try {
        const registroEliminado = await Registro.findByIdAndDelete(id);

        if (!registroEliminado) {
            return res.status(404).json({ message: 'Registro no encontrado.' });
        }

        res.status(200).json({ message: 'Registro eliminado con éxito.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro', error });
    }
};

module.exports = { obtenerRegistros, crearRegistro, actualizarSalida, eliminarRegistro };
