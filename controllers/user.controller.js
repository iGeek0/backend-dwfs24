const { response, request } = require('express');
const UserModel = require('../models/user.model');

const userGet = async (req = request , res = response) => {
    const users = await UserModel.find();
    res.status(200).json({
        message: "Datos cargados correctamente",
        data: users
    });
}

const userPost = async (req, res) => {
    const body = req.body;
    let user = new UserModel(body);
    await user.save();
    res.send('Entro a users POST');
}

const userPut = async (req, res) => {
    // query = id=123456 - es cuando es opcional...
    // params = /:id -  es cuando es obligatorio
    const { id } = req.query;
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {new: true});
    res.status(200).json({
        message: "Datos actualizado correctamente",
        data: updatedUser
    });
}

const userDelete = async (req, res) => {
    const { id } = req.query;
    await UserModel.findByIdAndDelete(id);
    res.status(200).json({
        message: "Usuario borrado con exito",
        data: null
    });
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}