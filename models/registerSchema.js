const mongoose = require('mongoose');


const registroSchema = new mongoose.Schema({
    placa: {
        type: String,
        required: true,
        unique: true,
    },
    tipo: {
        type: String,
        enum: ['carro', 'moto'],
        required: true,
    },
    horaEntrada: {
        type: Date,
        default: Date.now,
    },
    horaSalida: {
        type: Date,
        default: null,
    },
});


const Registro = mongoose.model('Registro', registroSchema);

module.exports = Registro;
