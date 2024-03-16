const express = require('express');
const app = express();
const puerto = 3000;

const userRoutes = require('./routes/user.route');

app.get('/', (req, res) => {
    res.send('¡Hola, Express!');
});

// IIFE = Immediately Invoked Function Expression
(() => {
    app.use(userRoutes);
})();


app.listen(puerto, () => {
    console.log('Servidor escuchando en http://localhost:' + puerto);
});