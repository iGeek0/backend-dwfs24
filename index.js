const express = require('express');
const app = express();
const puerto = 3000;

app.get('/', (req, res) => {
    res.send('¡Hola, Express!');
});


app.get('/users', (req, res) => {
    res.send('Entro a users GET');
});

app.post('/users', (req, res) => {
    res.send('Entro a users POST');
});

app.put('/users', (req, res) => {
    res.send('Entro a users PUT');
});

app.delete('/users', (req, res) => {
    res.send('Entro a users DELETE');
});

app.listen(puerto, () => {
    console.log('Servidor escuchando en http://localhost:' + puerto);
});