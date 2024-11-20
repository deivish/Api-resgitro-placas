const { obtenerRegistros, crearRegistro, actualizarSalida, eliminarRegistro } = require('../../controllers/registroController');
const Registro = require('../../models/registerSchema');
const mongoose = require('mongoose');

jest.mock('../../models/registerSchema'); // Mock del modelo Registro

describe('Registro Controller', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpia los mocks después de cada prueba
    });

    describe('obtenerRegistros', () => {
        it('debe retornar un array de registros con estado 200', async () => {
            const mockRegistros = [{ placa: 'ABC123', tipo: 'carro' }];
            Registro.find.mockResolvedValue(mockRegistros);

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await obtenerRegistros(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockRegistros);
        });

        it('debe manejar errores y retornar estado 500', async () => {
            Registro.find.mockRejectedValue(new Error('Error interno'));

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await obtenerRegistros(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Error al obtener registros',
                error: expect.any(Error),
            });
        });
    });

    describe('crearRegistro', () => {
        it('debe crear un registro y retornar estado 201', async () => {
            const req = {
                body: { placa: 'DEF456', tipo: 'carro' },
            };
            Registro.countDocuments.mockResolvedValue(3); // Simula cupos disponibles
            Registro.create.mockResolvedValue({ placa: 'DEF456', tipo: 'carro' });

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await crearRegistro(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Registro creado exitosamente',
                data: { placa: 'DEF456', tipo: 'carro' },
            });
        });

        it('debe retornar error si el tipo es inválido', async () => {
            const req = {
                body: { placa: 'XYZ789', tipo: 'bicicleta' },
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await crearRegistro(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Tipo inválido. Debe ser 'carro' o 'moto'.",
            });
        });

        it('debe manejar errores al crear un registro', async () => {
            const req = {
                body: { placa: 'DEF456', tipo: 'carro' },
            };
            Registro.countDocuments.mockResolvedValue(3);
            Registro.create.mockRejectedValue(new Error('Error interno'));

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await crearRegistro(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Error al crear registro',
                error: expect.any(String),
            });
        });
    });

    describe('actualizarSalida', () => {
        it('debe actualizar la hora de salida y retornar estado 200', async () => {
            const req = { params: { id: '123' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true); // Mock de validación ID
            Registro.findByIdAndUpdate.mockResolvedValue({
                _id: '123',
                placa: 'ABC123',
                tipo: 'carro',
                horaSalida: new Date(),
            });

            await actualizarSalida(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Registro actualizado con éxito',
                data: expect.objectContaining({ _id: '123' }),
            });
        });

        it('debe manejar un ID inválido', async () => {
            const req = { params: { id: 'abc' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(false);

            await actualizarSalida(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'ID inválido',
            });
        });
    });

    describe('eliminarRegistro', () => {
        it('debe eliminar un registro y retornar estado 200', async () => {
            const req = { params: { id: '123' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            Registro.findByIdAndDelete.mockResolvedValue({ _id: '123', placa: 'ABC123' });

            await eliminarRegistro(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Registro eliminado con éxito.',
            });
        });

        it('debe manejar errores al eliminar un registro', async () => {
            const req = { params: { id: '123' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            Registro.findByIdAndDelete.mockRejectedValue(new Error('Error interno'));

            await eliminarRegistro(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            // Ajustamos la verificación para aceptar un objeto de tipo Error
            expect(res.json).toHaveBeenCalledWith({
                message: 'Error al eliminar registro',
                error: expect.objectContaining({ message: expect.any(String) }), // Verificamos que el mensaje del error sea un string
            });
        });
    });
});
