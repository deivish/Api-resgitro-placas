let registros = []; 
let contadorId = 1; 
const obtenerRegistros = (req, res) => {
    res.status(200).json(registros);
};

const crearRegistro = (req, res) => {
    const { placa, tipo } = req.body;

    
    if (!['carro', 'moto'].includes(tipo)) {
        return res.status(400).json({ message: 'El tipo debe ser "carro" o "moto".' });
    }

    
    const limite = tipo === 'carro' ? 5 : 10;
    const ocupados = registros.filter(r => r.tipo === tipo && !r.horaSalida).length;

    if (ocupados >= limite) {
        return res.status(400).json({ message: `No hay cupos disponibles para ${tipo}s.` });
    }

    
    const nuevoRegistro = {
        id: contadorId++,
        placa,
        tipo,
        horaEntrada: new Date(),
        horaSalida: null,
    };

    registros.push(nuevoRegistro);
    res.status(201).json(nuevoRegistro);
};

const actualizarSalida = (req, res) => {
    const { id } = req.params;

    const registro = registros.find(r => r.id === parseInt(id));

    if (!registro) {
        return res.status(404).json({ message: 'Registro no encontrado.' });
    }

    if (registro.horaSalida) {
        return res.status(400).json({ message: 'La salida ya fue registrada.' });
    }

    registro.horaSalida = new Date();
    res.status(200).json(registro);
};

const eliminarRegistro = (req, res) => {
    const { id } = req.params;

    const indice = registros.findIndex(r => r.id === parseInt(id));
    if (indice === -1) {
        return res.status(404).json({ message: 'Registro no encontrado.' });
    }

    registros.splice(indice, 1);
    res.status(200).json({ message: 'Registro eliminado con éxito.' });
};

module.exports = { obtenerRegistros, crearRegistro, actualizarSalida, eliminarRegistro };
