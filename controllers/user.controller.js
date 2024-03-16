const { response, request } = require('express');

const userGet = (req, res) => {
    res.send('Entro a users GET');
}

const userPost = (req, res) => {
    res.send('Entro a users POST');
}

const userPut = (req, res) => {
    res.send('Entro a users PUT');
}

const userDelete = (req, res) => {
    res.send('Entro a users DELETE');
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}