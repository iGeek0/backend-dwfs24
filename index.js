const express = require('express');
require('dotenv').config();
const app = express();
const puerto = process.env.PORT || 3000;

const userRoutes = require('./routes/user.route');

app.get('/', (req, res) => {
    res.send('API de usuarios V1.0.0');
});

// IIFE = Immediately Invoked Function Expression
(() => {
    app.use(userRoutes);
})();


app.listen(puerto, () => {
    console.log('Servidor escuchando en http://localhost:' + puerto);
});