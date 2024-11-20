const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Registro de Vehículos',
            version: '1.0.0',
            description: 'API para registrar, modificar, eliminar y obtener registros de vehículos.',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desarrollo',
            },
        ],
    },
    apis: ['./routes/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUi };
