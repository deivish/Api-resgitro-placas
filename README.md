# Proyecto: Gestión de Registros de Vehículos

Este proyecto es una API desarrollada para gestionar el registro de vehículos (carros y motos), permitiendo crear, consultar, actualizar y eliminar registros. Además, incluye documentación de endpoints generada con Swagger.

## Descripción

El objetivo principal de esta API es facilitar la gestión de vehículos en un sistema, ofreciendo las siguientes funcionalidades:

- Registrar nuevos vehículos especificando su **placa** y **tipo** (carro o moto).
- Consultar la lista de vehículos registrados.
- Actualizar información sobre un vehículo, como la hora de salida.
- Eliminar registros de vehículos.
- Documentación interactiva y auto-generada de la API con Swagger.

## Tecnologías y Herramientas

El proyecto utiliza las siguientes tecnologías y herramientas:

### Backend
- **Node.js**: Entorno de ejecución para JavaScript.
- **Express.js**: Framework para la construcción de servidores web.
- **MongoDB**: Base de datos NoSQL para almacenamiento de registros.
- **Mongoose**: Librería para modelar objetos en MongoDB.
  
### Documentación
- **Swagger**: Herramienta para documentar y probar la API.

### Testing (Opcional, si se incluye)
- **Jest**: Framework para pruebas unitarias.
- **Supertest**: Herramienta para probar endpoints HTTP.

### Otros
- **dotenv**: Manejo de variables de entorno.
- **ESLint**: Herramienta para asegurar la calidad del código.
- **nodemon**: Reinicio automático del servidor en desarrollo.
- **CORS**: Middleware que permite solicitudes de diferentes dominios a tu API.

## Instalación y Configuración

### Prerrequisitos

- Node.js (v14 o superior)
- MongoDB (local o en la nube)
- npm o yarn

### Pasos para instalar y ejecutar el proyecto

1. Clonar el repositorio:

   ```bash
   git clone [https://github.com/deivish/Api-resgitro-placas.git]
   cd nombre-del-repositorio

##Instalar dependencias:
- npm install
- npm install express mongoose dotenv cors
- npm install --save-dev jest supertest
  
###Configurar las variables de entorno:
- Crear un archivo .env en la raíz del proyecto y configurar las siguientes variables:
- PORT=3000
- MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombre-base-datos

###Iniciar el servidor:
- npm run dev
###Acceder a la documentación de Swagger en tu navegador:
- http://localhost:3000/api-docs

## Endpoints
A continuación, se describen algunos de los endpoints principales:
- Registrar un vehículo (POST /api/registros)
Registra un nuevo vehículo en el sistema.
- Cuerpo de la solicitud:
{
  "placa": "AA123BB",
  "tipo": "moto"
}

- Respuestas:

- 201: Vehículo registrado exitosamente.
- 400: Error al registrar el vehículo.

2. Obtener todos los registros (GET /api/registros)
Devuelve una lista de todos los vehículos registrados.

- Respuestas:
- 200: Lista de registros obtenida exitosamente.

3. Actualizar hora de salida (PUT /api/registros/:id)
Actualiza la hora de salida de un vehículo específico.

- Parámetros de la ruta:

- id: ID del registro.
- Cuerpo de la solicitud:
{
  "horaSalida": "2024-11-19T14:30:00Z"
}
- Respuestas:

- 200: Hora de salida actualizada exitosamente.
- 404: Registro no encontrado.

4. Eliminar un registro (DELETE /api/registros/:id)
   Elimina un registro específico del sistema.

Parámetros de la ruta:

id: ID del registro.
- Respuestas:

.200: Registro eliminado exitosamente.
.404: Registro no encontrado.

##Contacto
Contacto
Si tienes preguntas o sugerencias, por favor no dudes en contactar:

Desarrollador principal: Deivis Herrera Cortes
Email: herrera.22cortes@gmail.com
