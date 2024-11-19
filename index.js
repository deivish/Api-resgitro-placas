const express = require('express');
const bodyParser = require('body-parser');
const registroRoutes = require('./routes/registroRoutes');

const app = express();


app.use(bodyParser.json());


app.use('/api/registros', registroRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;