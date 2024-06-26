const express = require('express');
require('dotenv').config();
const app = express();
const puerto = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());
const userRoutes = require('./routes/user.route');
const { dbConnection } = require('./database/config');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API de usuarios V1.0.0');
});

// IIFE = Immediately Invoked Function Expression
(async () => {
    await dbConnection();
    app.use(userRoutes);
})();


app.listen(puerto, () => {
    // iniciando servidor web
    console.log('Servidor escuchando en http://localhost:' + puerto);
});